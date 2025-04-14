import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptionsOffers: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 1,
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

  offers = [
    {
      leadIn: 'Предложение месяца',
      titleFirstPart: 'Продвижение в Instagram для вашего бизнеса',
      titleSecondPart: '!',
      titleSpan: '-15%',
      text: '',
      image: 'instagram.png',
      marginTop: '3px',
      marginBottom: '0',
    },
    {
      leadIn: 'Акция',
      titleFirstPart: 'Нужен грамотный',
      titleSecondPart: '?',
      titleSpan: 'копирайтер',
      text: 'Весь декабрь у нас действует акция на работу копирайтера.',
      image: 'copywriter.png',
      marginTop: '20px',
      marginBottom: '10px',
    },
    {
      leadIn: 'Новость дня',
      titleFirstPart: '',
      titleSecondPart: 'в ТОП-10 SMM-агенств Москвы!',
      titleSpan: '6 место',
      text: 'Мы благодарим каждого, кто голосовал за нас!',
      image: 'SMM.png',
      marginTop: '20px',
      marginBottom: '10px',
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
