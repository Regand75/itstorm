import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";
import {forkJoin, switchMap} from "rxjs";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {

  article!: ArticleType;
  articles: ArticleType[] = [];
  serverStaticPath = environment.serverStaticPath;

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        const url = params['url'];
        return forkJoin({
          article: this.articleService.getArticle(url),
          related: this.articleService.getRelatedArticles(url)
        });
      })
    ).subscribe(({ article, related }: { article: ArticleType; related: ArticleType[] }) => {
      if (article.text) {
        article.text = this.sanitizeHtml(article.text);
      }
      this.article = article;
      this.articles = related;
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
}
