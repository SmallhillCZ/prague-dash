import { Component, EventEmitter, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Geolocation } from "@capacitor/geolocation";
import { NavComponentWithProps, NavController } from "@ionic/angular";
import { CardCreateData } from "src/app/schema/card-create-data";
import { Language } from "src/app/schema/language";
import { DashboardService } from "src/app/services/dashboard.service";
import { ContainerCard } from "../../schema/container-card";
import { ContainerData, ContainerDataType } from "../../schema/container-data";
import { ContainerTypes } from "../../schema/container-type";
import { ContainerService } from "../../services/container.service";

@Component({
  selector: "pd-card-container-select",
  templateUrl: "./card-container-select.component.html",
  styleUrls: ["./card-container-select.component.scss"],
})
export class CardContainerSelectComponent implements OnInit {
  containers: ContainerData[] = [];

  search: string = "";

  lang = Language.cs;

  constructor(
    private containerService: ContainerService,
    private dash: DashboardService,
    private route: ActivatedRoute,
    private navController: NavController
  ) {}

  ngOnInit(): void {
    this.loadContainers();
  }

  async loadContainers() {
    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      .then((position) => {
        if (position) return { lat: position.coords.latitude, lon: position.coords.longitude };
        else return undefined;
      })
      .catch((err) => undefined);

    this.containers = await this.containerService.getContainers({
      search: this.search || undefined,
      coordinates,
    });
  }

  async onSelect(container: ContainerData) {
    const cardData: CardCreateData<ContainerCard> = {
      type: "container",
      title: container.location,
      definition: { id: container.id },
    };
    const pageId = this.route.snapshot.queryParams["page"];

    console.log(pageId, this.route.snapshot.queryParams);

    await this.dash.createCard(cardData, pageId);

    this.navController.navigateRoot("/dash", { queryParams: { page: pageId } });
  }

  getContainerTypeTitle(type: ContainerDataType, lang: Language) {
    return ContainerTypes[type.type].title[lang];
  }
}
