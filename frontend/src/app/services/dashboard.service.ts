import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Card } from "src/app/schema/card";
import { CardCreateData } from "src/app/schema/card-create-data";
import { CardType } from "src/app/schema/card-type";
import { CARDS } from "src/app/schema/cards-token";
import { Dashboard } from "src/app/schema/dashboard";
import { StorageService } from "./storage.service";
import { SyncService } from "./sync.service";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  dashboard = new BehaviorSubject<Dashboard | undefined>(undefined);

  constructor(
    private storage: StorageService,
    @Inject(CARDS) private cardTypes: CardType[],
    private syncService: SyncService,
  ) {
    // load dashbaord
    this.getDashboard().then((dash) => {
      this.dashboard.next(dash);
    });
  }

  async getDashboard() {
    const dash = await this.storage.get<Dashboard>("dashboard");

    if (!dash) {
      return {
        pages: [{ id: "0", title: "Hlavní", cards: [] }],
      } as Dashboard;
    }

    return dash;
    // function hasProp<K extends PropertyKey>(data: object, prop: K): data is Record<K, unknown> {
    //   return prop in data;
    // }

    // const pages: DashboardPage[] = [];
    // const cards: Card[] = [];

    // if (dashData && typeof dashData === "object") {

    //   if (hasProp(dashData, "pages") && Array.isArray(dashData.pages)) {
    //     (<unknown[]>dashData.pages).forEach(item => {
    //       if (!item || typeof item !== "object") return;
    //       if (!hasProp(item, "id") || typeof item.id !== "number") return;
    //       pages.push({
    //         id: item.id,
    //         title: hasProp(item, "title") && typeof item.title === "string" ? item.title : undefined,
    //         cards: []
    //       });
    //     });
    //   }

    //   if (hasProp(dashData, "cards") && Array.isArray(dashData.cards)) {
    //     (<unknown[]>dashData.cards).forEach(item => {
    //       if (!item || typeof item !== "object") return;
    //       if (!hasProp(item, "id") || typeof item.id !== "string") return;
    //       if (!hasProp(item, "definition") || typeof item.definition !== "object") return;
    //       if (!hasProp(item, "type") || typeof item.type !== "string" || !this.cardTypes.some(type => type.type === item.type)) return;

    //       const cardTitle = hasProp(item, "title") && typeof item.title === "string" ? item.title : undefined;
    //       const cardTypeTitle = this.cardTypes.find(cardType => cardType.type === item.type)?.title[this.lang];
    //       cards.push({
    //         id: item.id,
    //         type: item.type,
    //         definition: item.definition,
    //         title: cardTitle || cardTypeTitle || "?",
    //         color: hasProp(item, "color") && typeof item.color === "string" ? item.color : undefined,
    //         lastUpdate: hasProp(item, "lastUpdate") && typeof item.lastUpdate === "string" ? item.lastUpdate : undefined,
    //         notifications: hasProp(item, "notifications") && typeof item.notifications === "boolean" ? item.notifications : undefined,
    //       });
    //     });
    //   }

    // }

    // const dash: Dashboard = {
    //   pages: pages.length > 0 ? pages as [DashboardPage, ...DashboardPage[]] : [{ id: 0, cards: [] }],
    // };
  }

  async saveDashboard(dash: Dashboard) {
    await this.storage.set("dashboard", dash);

    this.dashboard.next(await this.getDashboard());
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
}
