import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'advantage',
  templateUrl: './advantage.component.html',
  styleUrls: ['./advantage.component.scss']
})
export class AdvantageComponent implements OnInit {

  @Input() advantages!: {
    number: string,
    title: string,
    text: string,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
