import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";

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
  @Input() article!: ArticleType;

  serverStaticPath = environment.serverStaticPath;

  constructor(private router: Router) { }

  get cardData() {
    return this.article || this.serviceCardData;
  }

  get cardImage(): string {
    if (this.isDataBackend) {
      return `${this.serverStaticPath}/${this.article.image}`;
    } else {
      return `/assets/images/card/${this.serviceCardData.image}`; // путь внутри проекта
    }
  }

  get isDataBackend(): boolean {
    return !!this.article;
  }

  ngOnInit(): void {
  }

}
