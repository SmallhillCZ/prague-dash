import { Component, ComponentFactoryResolver, EventEmitter, Inject, Input, OnChanges, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { CardType } from 'src/app/schema/card-type';
import { CardSelectComponentButton, CardSelectComponent } from 'src/app/schema/card-select-component';
import { CARDS } from 'src/app/schema/cards-token';

@Component({
  selector: 'app-card-selection-content',
  templateUrl: './card-selection-content.component.html',
  styleUrls: ['./card-selection-content.component.scss']
})
export class CardSelectionContentComponent implements OnInit, OnChanges {

  @Input() cardType?: CardType;

  @Output() select = new EventEmitter<any>();
  @Output() buttons = new EventEmitter<CardSelectComponentButton[]>();

  // @ViewChild("vc", { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  buttonsSubscription?: Subscription;
  selectSubscription?: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void { }

  ngOnChanges() {

    this.removeOldComponent();

    if (this.cardType) this.renderComponent(this.cardType);
  }

  renderComponent(cardType: CardType) {

    if (!this.cardType?.selectComponent) return;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardType.selectComponent!);

    const componentRef = this.viewContainerRef.createComponent<CardSelectComponent>(componentFactory);

    this.selectSubscription = componentRef.instance.select.subscribe(cardDefinition => this.select.emit(cardDefinition));

    this.buttonsSubscription = componentRef.instance.buttons?.subscribe(buttons => this.buttons.emit(buttons));

  }

  private removeOldComponent() {
    this.selectSubscription?.unsubscribe();

    this.buttonsSubscription?.unsubscribe();

    this.viewContainerRef.clear();

  }

}
