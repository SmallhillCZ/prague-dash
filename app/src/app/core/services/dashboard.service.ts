import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/schema/card';
import { Dashboard } from 'src/app/schema/dashboard';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboard = new BehaviorSubject<Dashboard | undefined>(undefined);

  constructor(
    private storage: StorageService
  ) {
    this.loadDashboard();
  }

  async getDashboard() {
    const dash = await this.storage.get<Dashboard>("dashboard");
    return Object.assign(new Dashboard(), dash);
  }

  async loadDashboard() {
    const dash = await this.getDashboard();
    this.dashboard.next(dash);
  }

  async saveDashboard(dash: Dashboard) {
    await this.storage.set("dashboard", dash);
    this.dashboard.next(dash);
  }

  async addCard(cardData: Omit<Card, "id">) {
    const dash = await this.getDashboard();

    const id = String(dash.cards.reduce((acc, cur) => Math.max(acc, Number(cur.id)), 0) + 1); // TODO: generate better unique id
    const card: Card = { ...cardData, id };

    dash?.cards.push(card);

    return this.saveDashboard(dash);
  }

  async updateCard(card: Card) {
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

}
