import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IonicModule, NavController } from "@ionic/angular";
import { CardCreateData } from "src/app/schema/card-create-data";
import { DashboardService } from "src/app/services/dashboard.service";
import { GeolocationService } from "src/app/services/geolocation.service";
import { GetAirQualityStationResponse } from "src/sdk";
import { AirQualityStationCard } from "../../schema/air-quality-station-card";
import { AirQualityService } from "../../services/air-quality.service";

@Component({
  selector: "pd-card-air-quality-station-select",
  templateUrl: "./card-air-quality-station-select.component.html",
  styleUrls: ["./card-air-quality-station-select.component.scss"],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CardAirQualityStationSelectComponent implements OnInit {
  stations: GetAirQualityStationResponse[] = [];

  search: string = "";

  lang = "cs" as "cs";

  constructor(
    private airQualityService: AirQualityService,
    private route: ActivatedRoute,
    private dash: DashboardService,
    private navController: NavController,
    private geolocationService: GeolocationService,
  ) {}

  ngOnInit(): void {
    this.loadAirQualityStations();
  }

  async loadAirQualityStations() {
    const coordinates = await this.geolocationService
      .getCurrentPosition({ enableHighAccuracy: true })
      .then((position) => {
        if (position) return { lat: position.coords.latitude, lon: position.coords.longitude };
        else return undefined;
      })
      .catch((err) => undefined);

    this.stations = await this.airQualityService
      .getAirQualityStations({
        search: this.search || undefined,
        coordinates,
      })
      .then((res) => res.data);
  }

  async onSelect(station: GetAirQualityStationResponse) {
    const cardData: CardCreateData<AirQualityStationCard> = {
      type: "air-quality-station",
      definition: { id: station.properties.id },
      title: station.properties.name,
    };

    const pageId = this.route.snapshot.queryParams["page"];

    await this.dash.createCard(cardData, pageId);

    this.navController.navigateRoot("/dash", { queryParams: { page: pageId } });
  }
}
