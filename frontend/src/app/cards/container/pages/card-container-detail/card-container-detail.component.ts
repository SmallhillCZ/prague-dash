import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Language } from "src/app/schema/language";
import { DashboardService } from "src/app/services/dashboard.service";
import { ContainerType, GetContainerResponseContainerType } from "src/sdk";
import { ContainerDetailCardComponent } from "../../components/container-detail-card/container-detail-card.component";
import { ContainerCard } from "../../schema/container-card";
import { ContainerTypes } from "../../schema/container-type";
import { ContainerService } from "../../services/container.service";

@Component({
  selector: "pd-card-container-detail",
  templateUrl: "./card-container-detail.component.html",
  styleUrls: ["./card-container-detail.component.scss"],
  imports: [CommonModule, IonicModule, RouterLink, ContainerDetailCardComponent],
})
export class CardContainerDetailComponent implements OnInit {
  types?: GetContainerResponseContainerType[];

  lang = Language.cs;

  constructor(
    private dash: DashboardService,
    private route: ActivatedRoute,
    private containerService: ContainerService,
  ) {}

  card?: ContainerCard;

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.loadCard(params["id"]));
  }

  async loadCard(id: string) {
    this.card = await this.dash.getCard(id);
    await this.loadData(this.card!);
  }

  async loadData(card: ContainerCard) {
    const data = await this.containerService.getContainer(card.definition.id);

    this.types = data.containerTypes;

    this.types?.sort((a, b) => {
      if (a.occupancy === null) return 1;
      if (b.occupancy === null) return -1;
      return this.getContainerTypeTitle(a, this.lang).localeCompare(this.getContainerTypeTitle(b, this.lang));
    });
  }

  private getContainerTypeTitle(type: ContainerType, lang: Language): string {
    return ContainerTypes[type.type].title[lang]!;
  }
}
