import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ArticleType} from "../../../../type/article.type";

@Component({
  selector: 'service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

  @Input() serviceCardData!: {
    image: string,
    title: string,
    description: string,
    price: string,
  };
  // @Input() isDataBackend: boolean = false;
  @Input() article!: ArticleType;

  constructor(private router: Router) { }

  get cardData() {
    return this.article || this.serviceCardData;
  }

  get cardImage(): string {
    if (this.isDataBackend) {
      return `http://localhost:3000/images/${this.article.image}`;
    } else {
      return `/assets/images/card/${this.serviceCardData.image}`; // путь внутри проекта
    }
  }

  get isDataBackend(): boolean {
    return !!this.article;
  }

  ngOnInit(): void {
  }

  navigate() {
    if (this.isDataBackend) {
      this.router.navigate(['/blog/']);
    }
  }

}
