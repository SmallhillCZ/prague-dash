import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { DashboardService } from "src/app/services/dashboard.service";
import { CardType } from "src/app/schema/card-type";
import { CARDS } from "src/app/schema/cards-token";

@Component({
  selector: "app-dash-card-add",
  templateUrl: "./dash-card-add.component.html",
  styleUrls: ["./dash-card-add.component.scss"],
})
export class DashCardAddComponent implements OnInit {
  constructor(
    private navController: NavController,
    private dashboard: DashboardService,
    @Inject(CARDS) public cards: CardType[],
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSelect(cardType: CardType) {
    const page = this.route.snapshot.params["page"];

    // TODO: redirect to module select
  }
}
