import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  OnChanges,
  OnInit,
  ViewContainerRef,
} from "@angular/core";
import { Card } from "src/app/schema/card";
import { CardComponent } from "src/app/schema/card-component";
import { CardType } from "src/app/schema/card-type";
import { CARDS } from "src/app/schema/cards-token";

@Component({
    selector: "pd-dash-card",
    templateUrl: "./dash-card.component.html",
    styleUrls: ["./dash-card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DashCardComponent implements OnInit, OnChanges {
  @Input() card!: Card;

  constructor(private viewContainerRef: ViewContainerRef, @Inject(CARDS) private cards: CardType[]) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.renderCard(this.card);
  }

  renderCard(card: Card) {
    const cardType = this.cards.find((item) => item.type === card.type);

    if (!cardType) return;

    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent<CardComponent>(cardType.component);

    componentRef.instance.card = card;
  }
}
