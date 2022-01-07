import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashCardComponent implements OnInit, OnChanges {

  @Input() card!: Card;

  classes: any = {};

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.classes = {};
    if (this.card.color) {
      this.classes["color-" + this.card.color] = true;
    }
  }


}
