import {Component, HostListener, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";
import {ActivatedRoute, Router} from "@angular/router";
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
  filterOpen: boolean = false;
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: { name: string, urlParam: string }[] = [];
  pages: number[] = [];

  @HostListener('document:click', ['$event'])
  click(event: Event): void {
    if (this.filterOpen && (event.target as HTMLElement).className.indexOf('blog-filter') === -1) {
      this.filterOpen = false;
    }
  }

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(): void {

    this.categoryService.getCategories()
      .subscribe((categories: CategoryType[]) => {
        this.categories = categories;
        this.activatedRoute.queryParams.subscribe(params => {
          const activeParams: ActiveParamsType = {categories: []};
          if (params['categories']) {
            activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
          }
          this.activeParams = activeParams;
          this.appliedFilters = [];
          this.activeParams.categories.forEach(url => {
            const foundType = this.categories.find((category) => category.url === url);
            if (foundType) {
              this.appliedFilters.push({
                name: foundType.name,
                urlParam: foundType.url
              });
            }
          });
        });
      });

    this.articleService.getArticles()
      .subscribe(data => {
        this.pages = [];
        for (let i = 1; i <= data.pages; i++) {
          this.pages.push(i);
        }
        this.articles = data.items;
      });
  }

  toggleFilterHead(): void {
    this.filterOpen = !this.filterOpen;
  }

  isActive(url: string): boolean {
    return this.activeParams.categories.includes(url);
  }

  updateFilterParams(url: string): void {
    const isAlreadyActive = this.activeParams.categories.includes(url);

    if (isAlreadyActive) {
      this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
    } else {
      // this.activeParams.categories.push(url);
      this.activeParams.categories = [...this.activeParams.categories, url];
    }

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }

  removeAppliedFilter(appliedFilter: { name: string, urlParam: string }): void {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam);
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }

}
