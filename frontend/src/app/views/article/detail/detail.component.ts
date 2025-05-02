import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";
import {forkJoin, switchMap} from "rxjs";
import {CommentType} from "../../../../types/comment.type";
import {CommentService} from "../../../shared/services/comment.service";
import {ActiveParamsCommentType} from "../../../../types/active-params-comment.type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {UserActionsType} from "../../../../types/user-actions.type";
import {AuthService} from "../../../core/auth/auth.service";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {

  isLogged: boolean = false;
  article!: ArticleType;
  articles: ArticleType[] = [];
  comments: CommentType[] = [];
  userActions: UserActionsType[] = [];
  loadComment: boolean = true;
  serverStaticPath: string = environment.serverStaticPath;
  allCommentsCount: number = 0; // Общее количество комментариев
  initialLoadLimit: number = 3; // При первичной загрузке
  loadMoreLimit: number = 10;   // При клике на кнопку "Загрузить ещё"
  currentLoadedOffset: number = 0;
  commentsParams: ActiveParamsCommentType = {
    offset: 0,
    article: '',
  };
  userActionsMap: { [commentId: string]: string[] } = {};
  commentForm: FormGroup;

  get shouldShowLoadMore(): boolean {
    return this.comments.length < this.allCommentsCount;
  }

  get hasComments(): boolean {
    return this.allCommentsCount > 0;
  }

  constructor(private articleService: ArticleService,
              private fb: FormBuilder,
              private authService: AuthService,
              private commentService: CommentService,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private loaderService: LoaderService,) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });
    this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          const url = params['url'];

          return forkJoin({
            article: this.articleService.getArticle(url),
            related: this.articleService.getRelatedArticles(url),
          });
        }),
        switchMap(({article, related}) => {
          // Сохраняем полученные данные статьи
          this.article = article;
          this.articles = related;

          // Устанавливаем ID статьи для запроса комментариев
          this.commentsParams.article = article.id;

          this.commentService.getActionsForArticleComments(this.article.id)
            .subscribe({
              next: (actions) => {
                if (Array.isArray(actions)) {
                  this.userActions = actions;
                }
              },
              error: () => {
                console.error('Не удалось загрузить действия пользователя');
              }
            });

          return this.commentService.getComments({
            ...this.commentsParams,
            offset: 0,
          });
        }))
      .subscribe((commentsResponse: { allCount: number, comments: CommentType[] }) => {
        if (this.article.text) {
          this.article.text = this.sanitizeHtml(this.article.text);
        }

        this.allCommentsCount = commentsResponse.allCount;
        // Показываем только первые 3 комментария
        this.currentLoadedOffset = this.initialLoadLimit;
        this.comments = commentsResponse.comments.slice(0, this.currentLoadedOffset);
      });

  }

  sanitizeHtml(html: string): string {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    const h1 = wrapper.querySelector('h1');
    if (h1) {
      const next = h1.nextElementSibling;
      if (next && next.tagName.toLowerCase() === 'p') {
        next.remove(); // удаляем <p>, если он сразу за <h1>
      }
      h1.remove(); // удаляем <h1>
    }

    return wrapper.innerHTML;
  }

  loadMoreComments(): void {
    this.loadComment = false;
    this.loaderService.show();
    setTimeout(() => {
      const currentOffset = this.comments.length;
      this.commentService.getComments({
        ...this.commentsParams,
        offset: currentOffset,
      })
        .subscribe({
          next: (response) => {
            const newComments = response.comments.slice(0, this.loadMoreLimit);
            this.comments = [...this.comments, ...newComments];
            this.currentLoadedOffset += newComments.length;
            this.allCommentsCount = response.allCount;
            this.loaderService.hide();
            this.loadComment = true;
          },
          error: (error) => {
            console.error('Ошибка при загрузке комментариев:', error);
            this.loaderService.hide();
            this.loadComment = true;
          }
        });
    },300);
  }

  postComment(): void {
    if (this.commentForm.valid && this.commentForm.value.text && this.commentsParams.article) {
      const text = this.commentForm.value.text.trim(); // убираем пробелы по краям

      this.commentService.addComment(text, this.commentsParams.article)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message || 'Ошибка добавления комментария');
              return;
            }

            this._snackBar.open('Вы успешно добавили комментарий!');

            // После добавления — обновляем комментарии без перезагрузки страницы:
            this.reloadComments();

            // Очищаем текстовое поле:
            this.commentForm.reset();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка добавления комментария');
            }
          }
        });
    }
  }

  reloadComments(): void {
    this.commentsParams.offset = 0; // сбрасываем offset

    this.commentService.getComments({
      ...this.commentsParams,
      offset: 0,
    }).subscribe({
      next: (commentsResponse) => {
        this.allCommentsCount = commentsResponse.allCount;

        // Показываем только первые initialLoadLimit комментариев
        this.currentLoadedOffset = this.initialLoadLimit;
        this.comments = commentsResponse.comments.slice(0, this.currentLoadedOffset);
      },
      error: (error) => {
        console.error('Ошибка при перезагрузке комментариев:', error);
        this._snackBar.open('Не удалось обновить комментарии');
      }
    });
  }

  hasUserAction(commentId: string, action: string): boolean {
    return this.userActions.some(item => item.comment === commentId && item.action === action);
  }

  applyUserAction(commentId: string, action: 'like' | 'dislike', comment?: CommentType): void {
    this.commentService.applyAction(commentId, action).pipe(
      switchMap(() => this.commentService.getActionsForComment(commentId))
    ).subscribe({
      next: (actionsResponse) => {
        if (!Array.isArray(actionsResponse)) {
          this._snackBar.open('Не удалось получить обновлённые действия');
          return;
        }

        // Получаем новое действие пользователя (или undefined, если снял лайк/дизлайк)
        const newAction = actionsResponse.find(a => a.comment === commentId)?.action;

        // Получаем предыдущее действие пользователя
        const prevAction = this.userActions.find(a => a.comment === commentId)?.action;

        // Обновляем userActions
        this.userActions = this.userActions.filter(a => a.comment !== commentId);
        if (newAction === 'like' || newAction === 'dislike') {
          this.userActions.push({ comment: commentId, action: newAction });
        }

        // Обновляем счетчики (если есть переданный comment)
        if (comment) {
          if (prevAction === 'like') {
            comment.likesCount--;
          } else if (prevAction === 'dislike') {
            comment.dislikesCount--;
          }

          if (newAction === 'like') {
            comment.likesCount++;
          } else if (newAction === 'dislike') {
            comment.dislikesCount++;
          }
        }

        this._snackBar.open('Ваш голос учтён');
      },
      error: () => {
        this._snackBar.open('Ошибка при попытке выполнить действие');
      }
    });
  }


  putLike(commentId: string, comment: CommentType): void {
    this.applyUserAction(commentId, 'like', comment);
  }

  putDislike(commentId: string, comment: CommentType): void {
    this.applyUserAction(commentId, 'dislike', comment);
  }

  putViolate(commentId: string): void {
    this.commentService.applyAction(commentId, 'violate').subscribe({
      next: (response) => {
        if ('error' in response && response.error) {
          this._snackBar.open(response.message || 'Не удалось пожаловаться');
        } else {
          this._snackBar.open('Жалоба отправлена');
        }
      },
      error: () => {
        this._snackBar.open('Жалоба уже отправлена');
      }
    });
  }

}


