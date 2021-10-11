import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-meta';
import { CardSelectComponent, CardSelectComponentButton } from 'src/app/schema/card-select-component';
import { CARDS } from 'src/app/schema/cards-token';
import { CreateCardOptions } from 'src/app/schema/create-card-options';

@UntilDestroy()
@Component({
  selector: 'app-card-selection',
  templateUrl: './card-selection.component.html',
  styleUrls: ['./card-selection.component.scss']
})
export class CardSelectionComponent implements OnInit, ViewWillEnter {

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

  async createCard(options: CreateCardOptions) {
    if (!this.cardType) return;

    await this.dashboardService.createCard(this.cardType.type, options);

    this.navController.navigateRoot("/");
  }

}
