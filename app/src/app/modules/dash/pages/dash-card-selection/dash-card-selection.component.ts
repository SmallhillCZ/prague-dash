import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CardSelectComponentButton } from 'src/app/schema/card-select-component';
import { CARDS } from 'src/app/schema/cards-token';
import { CardCreateData } from 'src/app/schema/card-create-data';

@UntilDestroy()
@Component({
  selector: 'app-dash-card-selection',
  templateUrl: './dash-card-selection.component.html',
  styleUrls: ['./dash-card-selection.component.scss']
})
export class DashCardSelectionComponent implements OnInit, ViewWillEnter {

  cardType?: CardType;

  buttons?: CardSelectComponentButton[];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private navController: NavController,
    @Inject(CARDS) private cards: CardType[]
  ) { }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        this.buttons = undefined;
        this.cardType = this.cards.find(item => item.type === params["type"]);
      });

  }

  async createCard(createData: CardCreateData) {
    if (!this.cardType) return;

    await this.dashboardService.createCard(this.route.snapshot.params["page"], this.cardType.type, createData);

    this.navController.navigateRoot("/dash", { queryParams: { page: this.route.snapshot.params["page"] } });
  }

}
