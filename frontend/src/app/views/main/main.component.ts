import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../shared/components/popup/popup.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  articles: ArticleType[] = [];
  allServices: string[] = [];

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

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
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
      service: 'Продвижение',
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
      service: 'Копирайтинг',
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
      service: 'SMM',
    },
  ];

  servicesCardData = [
    {
      image: 'photo1.png',
      title: 'Создание сайтов',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: '7 500',
      service: 'Создание сайтов',
    },
    {
      image: 'photo2.png',
      title: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: '3 500',
      service: 'Продвижение',
    },
    {
      image: 'photo3.png',
      title: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: '1 000',
      service: 'Реклама',
    },
    {
      image: 'photo4.png',
      title: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: '750',
      service: 'Копирайтинг',
    },
  ];

  advantages = [
    {
      title: 'Мастерски вовлекаем аудиториюв процесс.',
      text: 'Мы увеличиваем процент вовлечённости за короткий промежуток времени.',
    },
    {
      title: 'Разрабатываем бомбическую визуальную концепцию.',
      text: 'Наши специалисты знают как создать уникальный образ вашего проекта.',
    },
    {
      title: 'Создаём мощные воронки с помощью текстов.',
      text: 'Наши копирайтеры создают не только вкусные текста, но и классные воронки.',
    },
    {
      title: 'Помогаем продавать больше.',
      text: 'Мы не только помогаем разработать стратегию по продажам, но также корректируем её под нужды заказчика.',
    },
  ];

  reviews = [
    {
      name: 'Станислав',
      image: 'review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
    },
    {
      name: 'Алёна',
      image: 'review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.',
    },
    {
      name: 'Мария',
      image: 'review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!',
    },
    {
      name: 'Аделина',
      image: 'review4.jpg',
      text: 'АйтиШторм — это настоящие энтузиасты своего дела! Благодаря их блогу я впервые задумалась о том, как важно развивать личный бренд. Каждая статья — словно мини-лекция',
    },
    {
      name: 'Яника',
      image: 'review5.jpg',
      text: 'Благодаря АйтиШторму и их материалам я не только поняла, как выстраивать коммуникацию с аудиторией, но и начала свой путь как специалист в digital-маркетинге.',
    },
    {
      name: 'Марина',
      image: 'review6.jpg',
      text: 'Когда наткнулась на блог АйтиШторма, думала — просто полезные тексты. А оказалось — это целый учебник по продвижению! Уже после нескольких статей смогла пересобрать.',
    },
    {
      name: 'Станислав',
      image: 'review7.jpg',
      text: 'АйтиШторм буквально открыл мне глаза на важность личного позиционирования. Их блог помог мне понять, как рассказывать о себе, не стесняясь, а с гордостью.',
    },
  ]

  constructor(private articleService: ArticleService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.allServices = this.offers.map(offer => offer.service);
    this.articleService.getTopArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      });
  }

  openRequestService(service: string, allServices: string[]): void {
    this.dialog.open(PopupComponent, {
      width: '727px',
      data: {
        selectedService: service,
        allServices: allServices,
        openRequestService: true,
      }
    });
  }

}
