import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Geolocation } from "@capacitor/geolocation";
import { NavController } from "@ionic/angular";
import { CardCreateData } from "src/app/schema/card-create-data";
import { DashboardService } from "src/app/services/dashboard.service";
import { AirQualityStationCard } from "../../schema/air-quality-station-card";
import { AirQualityStationData } from "../../schema/air-quality-station-data";
import { AirQualityService } from "../../services/air-quality.service";

@Component({
  selector: "pd-card-air-quality-station-select",
  templateUrl: "./card-air-quality-station-select.component.html",
  styleUrls: ["./card-air-quality-station-select.component.scss"],
})
export class CardAirQualityStationSelectComponent implements OnInit {
  stations: AirQualityStationData[] = [];

  search: string = "";

  lang = "cs" as "cs";

  constructor(
    private airQualityService: AirQualityService,
    private route: ActivatedRoute,
    private dash: DashboardService,
    private navController: NavController
  ) {}

  ngOnInit(): void {
    this.loadAirQualityStations();
  }

  async loadAirQualityStations() {
    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      .then((position) => {
        if (position) return { lat: position.coords.latitude, lon: position.coords.longitude };
        else return undefined;
      })
      .catch((err) => undefined);

    this.stations = await this.airQualityService.getAirQualityStations({
      search: this.search || undefined,
      coordinates,
    });
  }

  async onSelect(station: AirQualityStationData) {
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
