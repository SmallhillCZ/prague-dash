import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cards } from 'src/app/cards/cards';
import { Card } from 'src/app/schema/card';
import { CardMeta } from 'src/app/schema/card-meta';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  cards = Cards;

  constructor(
    private navController: NavController
  ) { }

  ngOnInit(): void {
  }

  onSelect(card: CardMeta) {
    if (card.selectComponent) {
      this.navController.navigateForward("/add/" + card.id);
    }
  }

}
