import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Cards } from 'src/app/cards/cards';
import { Card } from 'src/app/schema/card';
import { CardComponent } from 'src/app/schema/card-component';
import { CardSettingsComponent } from 'src/app/schema/card-settings-component';

@Component({
  selector: 'app-card-custom-settings',
  templateUrl: './card-custom-settings.component.html',
  styleUrls: ['./card-custom-settings.component.scss']
})
export class CardCustomSettingsComponent implements OnInit {


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
    const cardType = Cards.find(item => item.type === card.type);

    if (!cardType || !cardType.settingsComponent) return;

    this.viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardType.settingsComponent);

    const componentRef = this.viewContainerRef.createComponent<CardSettingsComponent>(componentFactory);

    componentRef.instance.card = card;

  }

}
