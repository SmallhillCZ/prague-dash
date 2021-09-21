import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CardComponent, Cards } from 'src/app/cards/cards';
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
