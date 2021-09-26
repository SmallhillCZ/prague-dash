import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { Cards } from 'src/app/cards/cards';
import { Card } from 'src/app/schema/card';
import { CardComponent } from 'src/app/schema/card-component';
import { CardType } from 'src/app/schema/card-meta';
import { CardSelectComponent } from 'src/app/schema/card-select-component';

@Component({
  selector: 'app-card-select-content',
  templateUrl: './card-select-content.component.html',
  styleUrls: ['./card-select-content.component.scss']
})
export class CardSelectContentComponent implements OnInit, OnChanges {

  @Input() cardType!: CardType;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.renderCard(this.cardType);
  }

  renderCard(cardType: CardType) {

    this.viewContainerRef.clear();

    if (!cardType.selectComponent) return;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardType.selectComponent);

    const componentRef = this.viewContainerRef.createComponent<CardSelectComponent>(componentFactory);

  }

}
