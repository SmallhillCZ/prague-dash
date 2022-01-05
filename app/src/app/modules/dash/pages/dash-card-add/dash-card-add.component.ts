import { Component, Inject, OnInit } from '@angular/core';
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

  constructor(
    private navController: NavController,
    private dashboard: DashboardService,
    @Inject(CARDS) public cards: CardType[]
  ) { }

  ngOnInit(): void {
  }

  onSelect(cardType: CardType) {
    if (cardType.selectComponent) {
      this.navController.navigateForward("/dash/add/" + cardType.type);
    }
    else {
      this.dashboard.createCard(cardType.type, cardType.defaultDefinition || {});
      this.navController.navigateForward("/");
    }
  }

}
