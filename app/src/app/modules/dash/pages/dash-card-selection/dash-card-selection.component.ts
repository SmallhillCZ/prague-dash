import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CardSelectComponentButton } from 'src/app/schema/card-select-component';
import { CARDS } from 'src/app/schema/cards-token';

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
        this.cardType = this.cards.find(item => item.type === params["id"]);
      });

  }

  async createCard(options: Card["definition"]) {
    if (!this.cardType) return;

    await this.dashboardService.createCard(this.cardType.type, options);

    this.navController.navigateRoot("/");
  }

}
