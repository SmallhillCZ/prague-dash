import { Component, ComponentFactoryResolver, EventEmitter, Inject, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CardSettingsComponent } from 'src/app/schema/card-settings-component';
import { CARDS } from 'src/app/schema/cards-token';

@Component({
  selector: 'app-card-custom-settings',
  templateUrl: './card-custom-settings.component.html',
  styleUrls: ['./card-custom-settings.component.scss']
})
export class CardCustomSettingsComponent implements OnInit {


  @Input() card!: Card;

  @Output() change = new EventEmitter<any>();

  changeSubscription?: Subscription;

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

    if (!cardType || !cardType.settingsComponent) return;

    this.viewContainerRef.clear();

    this.changeSubscription?.unsubscribe();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardType.settingsComponent);

    const componentRef = this.viewContainerRef.createComponent<CardSettingsComponent>(componentFactory);

    componentRef.instance.card = card;
    this.changeSubscription = componentRef.instance.change.subscribe((value) => this.change.emit(value));

  }

}
