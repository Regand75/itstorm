import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../type/article.type";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../type/category.type";
import {Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticleType[] = [];
  categories: CategoryType[] = [];
  isDisabledLeftArrow: boolean = false;
  isDisabledRightArrow: boolean = false;
  open: boolean = false;
  activeParams: ActiveParamsType = {categories: []};

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.articleService.getArticles()
      .subscribe(articles => {
        this.articles = articles.items;
      });
    this.categoryService.getCategories()
      .subscribe((categories: CategoryType[]) => {
        this.categories = categories;
      });
  }

  toggleFilterHead(): void {
    this.open = !this.open;
  }

  isActive(url: string): boolean {
    return this.activeParams.categories.includes(url);
  }

  updateFilterParams(url: string): void {
    const isAlreadyActive = this.activeParams.categories.includes(url);

    if (isAlreadyActive) {
      this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
    } else {
      this.activeParams.categories.push(url);
    }

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }

}
