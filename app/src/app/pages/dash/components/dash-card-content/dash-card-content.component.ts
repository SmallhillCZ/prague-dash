import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { Cards, CardComponent } from 'src/app/cards/cards';
import { Card } from 'src/app/schema/card';

@Component({
  selector: 'app-dash-card-content',
  templateUrl: './dash-card-content.component.html',
  styleUrls: ['./dash-card-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashCardContentComponent implements OnInit, OnChanges {

  @Input() card!: Card;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.renderCard(this.card);
  }

  renderCard(card: Card) {
    const cardMeta = Cards[card.type];

    this.viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardMeta.component);

    const componentRef = this.viewContainerRef.createComponent<CardComponent>(componentFactory);

    componentRef.instance.data = card.data;

  }

}
