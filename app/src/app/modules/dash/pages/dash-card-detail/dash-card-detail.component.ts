import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';
import { Dashboard } from 'src/app/schema/dashboard';

@UntilDestroy()
@Component({
  selector: 'app-dash-card-detail',
  templateUrl: './dash-card-detail.component.html',
  styleUrls: ['./dash-card-detail.component.scss']
})
export class DashCardDetailComponent implements OnInit {

  card?: Card;
  cardType?: CardType;

  cardTitle?: string;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    @Inject(CARDS) private cardTypes: CardType[]
  ) { }

  ngOnInit(): void {
    const id = this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(params => this.loadCard(params["id"]));
  }

  async loadCard(id: string) {

    this.card = await this.dashboardService.getCard(id);

    this.cardType = this.cardTypes.find(item => item.type === this.card?.type);

    this.cardTitle = this.card?.title;
  }

}
