import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Inject, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { Card } from 'src/app/schema/card';
import { CardComponent } from 'src/app/schema/card-component';
import { CardType } from 'src/app/schema/card-meta';
import { CARDS } from 'src/app/schema/cards-token';

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

    if (!cardType) return;

    this.viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardType.component);

    const componentRef = this.viewContainerRef.createComponent<CardComponent>(componentFactory);

    componentRef.instance.card = card;

  }

}
