import { Component, Input, OnInit } from "@angular/core";
import { Language } from "src/app/schema/language";
import { ContainerCard } from "../../schema/container-card";
import { ContainerDataType } from "../../schema/container-data";
import { ContainerTypes } from "../../schema/container-type";
import { ContainerService } from "../../services/container.service";

@Component({
  selector: "app-card-container-detail",
  templateUrl: "./card-container-detail.component.html",
  styleUrls: ["./card-container-detail.component.scss"],
})
export class CardContainerDetailComponent implements OnInit {
  types?: ContainerDataType[];

  lang = Language.cs;

  constructor(private containerService: ContainerService) {}

  // TODO: @Input()
  card!: ContainerCard;

  ngOnInit(): void {
    this.loadData(this.card);
  }

  async loadData(card: ContainerCard) {
    const data = await this.containerService.getContainer(card.definition.id);

    this.types = data.types;

    this.types.sort((a, b) => {
      if (a.occupancy === null) return 1;
      if (b.occupancy === null) return -1;
      return this.getContainerTypeTitle(a, this.lang).localeCompare(this.getContainerTypeTitle(b, this.lang));
    });
  }

  private getContainerTypeTitle(type: ContainerDataType, lang: Language): string {
    return ContainerTypes[type.type].title[lang]!;
  }
}
