import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';

@Component({
  selector: 'app-dash-card-add',
  templateUrl: './dash-card-add.component.html',
  styleUrls: ['./dash-card-add.component.scss']
})
export class DashCardAddComponent implements OnInit {

  page?: number;

  constructor(
    private navController: NavController,
    private dashboard: DashboardService,
    @Inject(CARDS) public cards: CardType[],
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.page = params["page"];
    });
  }

  onSelect(cardType: CardType) {
    const page = this.route.snapshot.params["page"];

    if (cardType.selectComponent) {
      this.navController.navigateForward(`/page/${page}/add/${cardType.type}`);
    }
    else {
      this.dashboard.createCard(page, cardType.type, { definition: cardType.defaultDefinition || {}, title: cardType.title.cs });
      this.navController.navigateForward("/dash", { queryParams: { page } });
    }
  }

}
