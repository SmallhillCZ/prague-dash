import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cards } from 'src/app/cards/cards';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-meta';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.scss']
})
export class CardAddComponent implements OnInit {

  cards = Cards;

  constructor(
    private navController: NavController
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
