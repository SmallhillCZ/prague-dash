import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.scss']
})
export class CardAddComponent implements OnInit {

  constructor(
    private navController: NavController,
    @Inject(CARDS) public cards: CardType[]
  ) { }

  ngOnInit(): void {
  }

  onSelect(cardType: CardType) {
    if (cardType.selectComponent) {
      this.navController.navigateForward("/card/add/" + cardType.type);
    }
    else {

    }
  }

}
