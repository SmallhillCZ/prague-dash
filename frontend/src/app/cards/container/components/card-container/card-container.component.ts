import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CardComponent } from "src/app/schema/card-component";
import { BarChartComponent } from "src/app/shared/components/bar-chart/bar-chart.component";
import { CardContentComponent } from "src/app/shared/components/card-content/card-content.component";
import { CardTitleComponent } from "src/app/shared/components/card-title/card-title.component";
import { CardComponent as CardElComponent } from "src/app/shared/components/card/card.component";
import { ContainerCard } from "../../schema/container-card";
import { ContainerTypes } from "../../schema/container-type";
import { ContainerService } from "../../services/container.service";

@UntilDestroy()
@Component({
  selector: "pd-card-container",
  templateUrl: "./card-container.component.html",
  styleUrls: ["./card-container.component.scss"],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    CardElComponent,
    CardTitleComponent,
    CardContentComponent,
    BarChartComponent,
  ],
})
export class CardContainerComponent implements CardComponent, OnInit {
  lang = "cs" as "cs";

  @Input() card!: ContainerCard;

  location?: string;

  types?: { name: string; occupancy: number }[];

  loadingTypes = Array(3).fill(null);

  constructor(private containerService: ContainerService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const data = await this.containerService.getContainer(this.card.definition.id);
    this.location = data.location;

    this.types = data.containerTypes
      .filter((item) => this.card.definition?.showNotMetered || !!item.occupancy)
      .map((item) => ({ name: ContainerTypes[item.type].title[this.lang], occupancy: item.occupancy! }));

    this.types!.sort((a, b) => {
      if (a.occupancy === null) return 1;
      if (b.occupancy === null) return -1;
      return a.name.localeCompare(b.name);
    });
  }
}
