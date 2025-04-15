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

  servicesCardData = [
    {
      image: 'photo1.png',
      title: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: '7 500',
    },
    {
      image: 'photo2.png',
      title: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: '3 500',
    },
    {
      image: 'photo3.png',
      title: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: '1 000',
    },
    {
      image: 'photo4.png',
      title: 'Копирайтинг',
      text: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: '750',
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
