import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { Cards } from 'src/app/cards/cards';
import { Card } from 'src/app/schema/card';
import { CardComponent } from 'src/app/schema/card-component';

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
    const cardMeta = Cards.find(item => item.id === card.type);

    if (!cardMeta) return;

    this.viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardMeta.component);

    const componentRef = this.viewContainerRef.createComponent<CardComponent>(componentFactory);

    componentRef.instance.card = card;

  }

}
