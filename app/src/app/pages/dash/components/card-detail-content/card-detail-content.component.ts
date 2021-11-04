import { Component, ComponentFactoryResolver, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Card } from 'src/app/schema/card';
import { CardDetailComponent } from 'src/app/schema/card-detail-component';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';

@Component({
  selector: 'app-card-detail-content',
  templateUrl: './card-detail-content.component.html',
  styleUrls: ['./card-detail-content.component.scss']
})
export class CardDetailContentComponent implements OnInit {

  @Input()
  card!: Card;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Inject(CARDS) private cards: CardType[]
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.renderCard(this.card);
  }

  renderCard(card: Card) {
    const cardType = this.cards.find(item => item.type === card.type);

    if (!cardType || !cardType.detailComponent) return;

    this.viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardType.detailComponent);

    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    componentRef.instance.card = card;

  }

}
