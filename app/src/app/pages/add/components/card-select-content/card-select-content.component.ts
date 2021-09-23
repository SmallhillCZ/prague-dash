import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { Cards } from 'src/app/cards/cards';
import { Card } from 'src/app/schema/card';
import { CardComponent } from 'src/app/schema/card-component';
import { CardMeta } from 'src/app/schema/card-meta';
import { CardSelectComponent } from 'src/app/schema/card-select-component';

@Component({
  selector: 'app-card-select-content',
  templateUrl: './card-select-content.component.html',
  styleUrls: ['./card-select-content.component.scss']
})
export class CardSelectContentComponent implements OnInit, OnChanges {

  @Input() cardMeta!: CardMeta;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.renderCard(this.cardMeta);
  }

  renderCard(cardMeta: CardMeta) {

    this.viewContainerRef.clear();

    if (!cardMeta.selectComponent) return;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardMeta.selectComponent);

    const componentRef = this.viewContainerRef.createComponent<CardSelectComponent>(componentFactory);

  }

}
