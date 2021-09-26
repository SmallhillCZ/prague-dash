import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Cards } from 'src/app/cards/cards';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-meta';

@UntilDestroy()
@Component({
  selector: 'app-card-settings',
  templateUrl: './card-settings.component.html',
  styleUrls: ['./card-settings.component.scss']
})
export class CardSettingsComponent implements OnInit, ViewWillEnter {

  card?: Card;
  cardType?: CardType;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe((params: Params) => this.loadCard(params["id"]));
  }

  private loadCard(id: string) {
    this.card = this.dashboardService.dashboard.value?.cards.find(item => item.id === id);

    this.cardType = Cards.find(item => item.type === this.card?.type);
  }

  async deleteCard(id: string) {
    await this.dashboardService.removeCard(id);
    this.navController.navigateRoot("/");
  }

  async saveCard() {
    if (!this.card) return;
    console.log("change", this.card);
    this.dashboardService.updateCard(this.card);
  }

}
