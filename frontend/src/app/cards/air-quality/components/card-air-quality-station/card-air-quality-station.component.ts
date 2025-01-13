import { Component, Input, OnInit } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CardComponent } from "src/app/schema/card-component";
import { AirQualityComponent, AirQualityComponents } from "../../schema/air-quality-components";
import { AirQualityStationCard } from "../../schema/air-quality-station-card";
import { AirQualityStationComponent } from "../../schema/air-quality-station-data";
import { AirQualityService } from "../../services/air-quality.service";

@UntilDestroy()
@Component({
    selector: "pd-card-air-quality-station",
    templateUrl: "./card-air-quality-station.component.html",
    styleUrls: ["./card-air-quality-station.component.scss"],
    standalone: false
})
export class CardAirQualityStationComponent implements CardComponent, OnInit {
  types = AirQualityComponents;

  lang = "cs" as "cs";

  @Input() card!: AirQualityStationCard;

  name?: string;
  components?: (AirQualityStationComponent & { typeInfo?: AirQualityComponent })[];

  loading = Array(3).fill(null);

  constructor(private airQualityService: AirQualityService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const data = await this.airQualityService.getAirQualityStation(this.card.definition.id);

    this.name = data.properties.name;

    this.components = data.properties.measurement.components.map((component) => ({
      ...component,
      typeInfo: this.types[component.type],
    }));
  }
}
