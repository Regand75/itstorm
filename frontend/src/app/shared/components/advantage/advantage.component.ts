import {Component, Input, OnInit} from '@angular/core';
import {AdvantageType} from "../../../../types/advantage.type";

@Component({
  selector: 'advantage',
  templateUrl: './advantage.component.html',
  styleUrls: ['./advantage.component.scss']
})
export class AdvantageComponent implements OnInit {

  @Input() advantages: AdvantageType;
  @Input() index: number;

  constructor() {
    this.advantages = {
      title: '',
      text: '',
    };
    this.index = 0;
  }

  ngOnInit(): void {
  }

}
