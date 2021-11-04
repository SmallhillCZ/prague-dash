import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';
import { Dashboard } from 'src/app/schema/dashboard';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboard = new BehaviorSubject<Dashboard | undefined>(undefined);

  constructor(
    private storage: StorageService,
    @Inject(CARDS) private cardTypes: CardType[],
  ) {
    this.loadDashboard();
  }

  async getDashboard() {
    const dash = await this.storage.get<Dashboard>("dashboard");
    return Object.assign(new Dashboard(), dash);
  }

  async loadDashboard() {
    let dash = await this.getDashboard();
    dash = this.fixDash(dash);
    this.dashboard.next(dash);
  }

  async saveDashboard(dash: Dashboard) {
    dash = this.fixDash(dash);
    await this.storage.set("dashboard", dash);
    return this.loadDashboard();
  }

  async createCard(type: string, definition: Card["definition"]) {

    const dash = await this.getDashboard();

    const id = String(dash.cards.reduce((acc, cur) => Math.max(acc, Number(cur.id)), 0) + 1); // TODO: generate better unique id
    const card: Card = {
      id,
      type,
      color: "white",
      definition,
    };

    dash?.cards.push(card);

    return this.saveDashboard(dash);
  }

  async updateCard(card: Card) {
    card = JSON.parse(JSON.stringify(card));

    const dash = await this.getDashboard();
    const i = dash.cards.findIndex(item => item.id === card.id);

    if (i === -1) {
      dash.cards.push(card);
    }
    else {
      dash.cards.splice(i, 1, card);
    }

    this.saveDashboard(dash);
  }

  async removeCard(id: string) {
    const dash = await this.getDashboard();
    const i = dash.cards.findIndex(item => item.id === id);

    dash.cards.splice(i, 1);

    this.saveDashboard(dash);
  }

  fixDash(dash: Dashboard): Dashboard {
    // filter out invalid cards
    dash.cards = dash.cards.filter(item => this.cardTypes.some(type => type.type === item.type));

    return dash;
  }

}
