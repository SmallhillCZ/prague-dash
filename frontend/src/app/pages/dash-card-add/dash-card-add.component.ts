import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { CardCreateData } from "src/app/schema/card-create-data";
import { CardType } from "src/app/schema/card-type";
import { CARDS } from "src/app/schema/cards-token";
import { DashboardPage } from "src/app/schema/dashboard";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
    selector: "app-dash-card-add",
    templateUrl: "./dash-card-add.component.html",
    styleUrls: ["./dash-card-add.component.scss"],
    standalone: false
})
export class DashCardAddComponent implements OnInit {
  page?: DashboardPage;

  constructor(
    @Inject(CARDS) public cardTypes: CardType[],
    private route: ActivatedRoute,
    private navController: NavController,
    private dash: DashboardService
  ) {}

  ngOnInit(): void {}

  async addCard(cardType: CardType) {
    const pageId = this.route.snapshot.params["page"];

    if (cardType.createUrl) {
      await this.navController.navigateForward(cardType.createUrl, { queryParams: { page: pageId } });
    } else {
      const cardData: CardCreateData = {
        type: cardType.type,
        title: cardType.title.cs,
        definition: {},
      };

      await this.dash.createCard(cardData, pageId);

      this.navController.navigateRoot("/dash", { queryParams: { page: pageId } });
    }
  }
}
