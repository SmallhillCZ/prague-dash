import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CardComponent } from "src/app/schema/card-component";
import { CardContentComponent } from "src/app/shared/components/card-content/card-content.component";
import { CardTitleComponent } from "src/app/shared/components/card-title/card-title.component";
import { CardComponent as CardElComponent } from "src/app/shared/components/card/card.component";
import { GetAirQualityStationResponseComponent } from "src/sdk";
import { AirQualityComponent, AirQualityComponents } from "../../schema/air-quality-components";
import { AirQualityStationCard } from "../../schema/air-quality-station-card";
import { AirQualityComponentType } from "../../schema/air-quality-station-data";
import { AirQualityService } from "../../services/air-quality.service";

@UntilDestroy()
@Component({
  selector: "pd-card-air-quality-station",
  templateUrl: "./card-air-quality-station.component.html",
  styleUrls: ["./card-air-quality-station.component.scss"],
  imports: [CommonModule, IonicModule, CardElComponent, CardTitleComponent, CardContentComponent],
})
export class CardAirQualityStationComponent implements CardComponent, OnInit {
  types = AirQualityComponents;

  lang = "cs" as "cs";

  @Input() card!: AirQualityStationCard;

  name?: string;
  components?: (GetAirQualityStationResponseComponent & { typeInfo?: AirQualityComponent })[];

  loading = Array(3).fill(null);

  constructor(private airQualityService: AirQualityService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const data = await this.airQualityService.getAirQualityStation(this.card.definition.id);

    this.name = data.properties.name;

    this.components = data.properties.measurement?.components?.map((component) => ({
      ...component,
      typeInfo: component.type ? this.types[component.type as AirQualityComponentType] : undefined,
    }));
  }
}
