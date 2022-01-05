import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ItemReorderCustomEvent, NavController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { Dashboard, DashboardPage } from 'src/app/schema/dashboard';

@UntilDestroy()
@Component({
  selector: 'app-dash-edit-page',
  templateUrl: './dash-edit-page.component.html',
  styleUrls: ['./dash-edit-page.component.scss']
})
export class DashEditPageComponent implements OnInit {

  dashboard?: Dashboard;

  page?: DashboardPage;

  sortCards: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {

    const dash = this.dashboardService.dashboard.pipe(untilDestroyed(this));
    const params = this.route.params.pipe(untilDestroyed(this));

    combineLatest([dash, params]).subscribe(([dash, params]) => {
      this.dashboard = dash;
      this.page = dash?.pages.find(item => item.id === params["page"]);
    });
  }

  onReorder(event: ItemReorderCustomEvent) {
    if (!this.dashboard || !this.page) return;

    this.page.cards.splice(event.detail.to, 0, ...this.page?.cards.splice(event.detail.from, 1));

    this.dashboardService.saveDashboard(this.dashboard);
    event.detail.complete(true);
  }

  onCardClick(card: Card) {
    if (this.sortCards) return;
    this.navController.navigateForward(`/card/${card.id}/settings`);
  }

  save() {
    if (!this.dashboard) return;
    return this.dashboardService.saveDashboard(this.dashboard);
  }

  async deletePage() {
    const alert = await this.alertController.create({
      header: "Smazat stránku",
      message: "Pozor: smažete i všechny karty na ní!",
      buttons: [
        { text: "Zrušit", role: "cancel" },
        { text: "Smazat", handler: () => this.deletePageConfirmed() }
      ]
    });

    alert.present();
  }

  async deletePageConfirmed() {
    if (!this.dashboard) return;
    if (!this.page) return;

    this.dashboard.pages.splice(this.dashboard.pages.findIndex(item => item.id === this.page!.id), 1);

    await this.save();

    this.navController.navigateRoot("/");
  }
}
