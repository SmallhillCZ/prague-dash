import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';
import { Dashboard } from 'src/app/schema/dashboard';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  card?: Card;
  cardType?: CardType;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    @Inject(CARDS) private cardTypes: CardType[]
  ) { }

  ngOnInit(): void {
    const id = this.route.params.pipe(map(params => params["id"]));

    const dashboard = this.dashboardService.dashboard;

    combineLatest([id, dashboard])
      .pipe(filter(items => !!items[1]))
      .subscribe(([id, dashboard]) => this.loadCard(id, dashboard!));
  }

  async loadCard(id: string, dashboard: Dashboard) {
    this.card = dashboard?.cards.find(item => item.id === id);

    this.cardType = this.cardTypes.find(item => item.type === this.card?.type);
  }

}
