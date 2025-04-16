import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

  @Input() serviceCardData!: {
    image: string,
    title: string,
    text: string,
    price: string,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
