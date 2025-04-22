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
  filterOpen: boolean = false;
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: { name: string, urlParam: string }[] = [];
  pages: number[] = [];

  @HostListener('document:click', ['$event'])
  click(event: Event): void {
    if (this.filterOpen &&
      !(event.target as HTMLElement).closest('.blog-filter, .blog-applied-filter, .blog-filter-head-icon, .blog-filter-item-icon')) {
      this.filterOpen = false;
    }
  }

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,) {
  }

  get isDisabledPrevPage(): boolean {
    const currentPage = this.activeParams.page ? +this.activeParams.page : 1;
    return currentPage === 1;
  }

  get isDisabledNextPage(): boolean {
    const currentPage = this.activeParams.page ? +this.activeParams.page : 1;
    return currentPage === this.pages.length;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params['page']) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {...params, page: 1}, // Добавляем page=1, сохраняя остальные параметры
          queryParamsHandling: 'merge' // Объединяем новые параметры с текущими
        });
      }
    });
    this.categoryService.getCategories()
      .subscribe((categories: CategoryType[]) => {
        this.categories = categories;
        this.activatedRoute.queryParams.subscribe(params => {
          const activeParams: ActiveParamsType = {categories: []};
          if (params['categories']) {
            activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
          }
          if (params.hasOwnProperty('page')) {
            activeParams.page = +params['page'];
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
          this.articleService.getArticles(this.activeParams)
            .subscribe(data => {
              this.pages = [];
              for (let i = 1; i <= data.pages; i++) {
                this.pages.push(i);
              }
              this.articles = data.items;
            });
        });
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
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }

  removeAppliedFilter(appliedFilter: { name: string, urlParam: string }): void {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam);
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }

  openPage(page: number): void {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }

  openPrevPage(): void {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams,
      });
    }
  }

  openNextPage(): void {
    console.log(this.activeParams.page);
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams,
      });
    }
  }

}
