import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';

@UntilDestroy()
@Component({
  selector: 'app-dash-card-settings',
  templateUrl: './dash-card-settings.component.html',
  styleUrls: ['./dash-card-settings.component.scss']
})
export class DashCardSettingsComponent implements OnInit, ViewWillEnter {

  card?: Card;
  cardType?: CardType;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private dashboardService: DashboardService,
    @Inject(CARDS) private cards: CardType[]
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

    this.cardType = this.cards.find(item => item.type === this.card?.type);
  }

  async deleteCard(id: string) {
    await this.dashboardService.removeCard(id);
    this.navController.navigateRoot("/");
  }

  async save() {
    if (!this.card) return;
    this.dashboardService.updateCard(this.card);
  }

  async saveCustom(definition: any) {
    if (!this.card) return;
    this.card.definition = definition;
    this.save();
  }

}
