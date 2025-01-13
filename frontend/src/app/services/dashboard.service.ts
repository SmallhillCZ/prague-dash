import { Inject, Injectable } from "@angular/core";
import { validateSync } from "class-validator";
import { BehaviorSubject } from "rxjs";
import { Card } from "src/app/schema/card";
import { CardCreateData } from "src/app/schema/card-create-data";
import { CardType } from "src/app/schema/card-type";
import { CARDS } from "src/app/schema/cards-token";
import { Dashboard } from "src/app/schema/dashboard";
import { Logger } from "src/logger";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private readonly logger = new Logger("DashboardService");

  dashboard = new BehaviorSubject<Dashboard | undefined>(undefined);

  constructor(
    private storage: StorageService,
    @Inject(CARDS) private cardTypes: CardType[],
  ) {
    // load dashbaord
    this.loadDashboard();
  }

  getDashboard() {
    const dash = this.storage.get<Dashboard>("dashboard");

    if (!dash || !this.validateDashboard(dash)) {
      return {
        pages: [{ id: "0", title: "Hlavní", cards: [] }],
      } as Dashboard;
    }

    return dash;
  }

  loadDashboard() {
    this.dashboard.next(this.getDashboard());
  }

  saveDashboard(dash: Dashboard) {
    if (!this.validateDashboard(dash)) {
      throw new Error("Invalid dashboard!");
    }

    this.storage.set("dashboard", dash);
    this.logger.verbose("dashboard saved");

    this.dashboard.next(this.getDashboard());
  }

  async createPage(title?: string) {
    const dash = await this.getDashboard();

    let id = 0;
    while (dash.pages.some((item) => item.id === String(id))) id++;

    const page = { id: String(id), title, cards: [] };

    dash.pages.push(page);

    await this.saveDashboard(dash);

    return page;
  }

  async createCard<T extends Card = Card>(createData: CardCreateData<T>, pageId?: string) {
    const dashboard = await this.getDashboard();

    const page = dashboard.pages.find((item) => item.id === pageId) || dashboard.pages[0];

    let id = 0;
    while (dashboard.pages.some((page) => page.cards.some((item) => item.id === String(id)))) id++;

    page.cards.push({ id: String(id), ...createData });

    return this.saveDashboard(dashboard);
  }

  async saveCard(card: Card) {
    card = JSON.parse(JSON.stringify(card));

    const dash = await this.getDashboard();

    const page = dash.pages.find((page) => page.cards.some((item) => item.id === card.id));
    if (!page) throw new Error(`Page for card ${card.id} not found!`);

    const i = page.cards.findIndex((item) => item.id === card.id);

    if (i === -1) {
      page.cards.push(card);
    } else {
      page.cards.splice(i, 1, card);
    }

    this.saveDashboard(dash);
  }

  async removeCard(id: string) {
    const dash = await this.getDashboard();

    const page = dash.pages.find((page) => page.cards.some((item) => item.id === id));
    if (!page) throw new Error(`Page for card ${id} not found!`);

    const i = page.cards.findIndex((item) => item.id === id);

    page.cards.splice(i, 1);

    this.saveDashboard(dash);
  }

  async getCard(id: Card["id"]) {
    const dash = await this.getDashboard();
    for (let page of dash.pages) {
      for (let card of page.cards) {
        if (card.id === id) return card;
      }
    }
    return undefined;
  }

  private validateDashboard(data: Dashboard) {
    const dashboard = Object.assign(new Dashboard(), data);

    const result = validateSync(dashboard);
    if (result.length) this.logger.error("Dashboard not valid", result);

    return result.length === 0;
  }
}
