import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardType } from 'src/app/schema/card-meta';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Cards } from 'src/app/cards/cards';

@UntilDestroy()
@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.component.html',
  styleUrls: ['./card-select.component.scss']
})
export class CardSelectComponent implements OnInit {

  cardType?: CardType;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(params => this.setCard(params["id"]));
  }

  setCard(type: string): void {
    this.cardType = Cards.find(item => item.type === type);
  }

}
