import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { ContainerData } from './schema/container-data';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(
    private api: ApiService,
    private dashboardService: DashboardService
  ) {
    timer(0, 30000).subscribe(() => this.updateCards());
  }

  async addCard(container: ContainerData) {
    const card = this.createCard(container);
    await this.dashboardService.addCard(card);
  }

  async updateCard(oldCard: Card<ContainerData>): Promise<Card> {
    const container = await this.api.get<ContainerData>(`containers/${oldCard.data.id}`);

    const card: Card<ContainerData> = {
      ...this.createCard(container),
      id: oldCard.id,
      lastUpdate: new Date().toISOString()
    };

    await this.dashboardService.updateCard(card);

    return card;
  }

  async getContainers() {
    return this.api.get<ContainerData[]>("containers");
  }

  private async updateCards() {

    console.log("Checking container cards for update...");

    const cards = (this.dashboardService.dashboard.value?.cards || [])
      .filter(item => item.type === "container");

    if (!cards.length) {
      console.log("No container cards to update.");
      return;
    }

    for (let card of cards) {

      if (card.type !== "container") continue;


      this.updateCard(card);
    }

    console.log(`Updated ${cards.length} cards.`);
  }

  private createCard(container: ContainerData): Omit<Card, "id"> {
    return {
      type: "container",
      data: container,
      icon: "trash-outline",
      title: container.location
    };
  }
}
