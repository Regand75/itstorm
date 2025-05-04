import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";
import {PopupComponent} from "../popup/popup.component";
import {MatDialog} from "@angular/material/dialog";

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
    service: string,
  };

  @Input() servicesCardData!: {
    image: string,
    title: string,
    description: string,
    price: string,
    service: string,
  }[];

  @Input() article!: ArticleType;
  allServices: string[] = [];
  serverStaticPath = environment.serverStaticPath;

  constructor(private dialog: MatDialog,
              private router: Router) { }

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
    if (this.serviceCardData) {
      this.allServices = this.servicesCardData.map(data => data.service);
    }
  }

  openRequestService(service: string): void {
    this.dialog.open(PopupComponent, {
      width: '727px',
      data: {
        selectedService: service,
        allServices: this.allServices,
        openRequestService: true,
      }
    });
  }
}
