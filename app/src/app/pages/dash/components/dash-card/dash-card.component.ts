import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/schema/card';

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashCardComponent implements OnInit {

  @Input() card!: Card;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
