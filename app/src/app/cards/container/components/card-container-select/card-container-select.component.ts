import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/core/services/api.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Card } from 'src/app/schema/card';
import { ContainerService } from '../../container.service';
import { ContainerData } from '../../schema/container-data';
import { ContainerTypeNames } from '../../schema/container-type';

@Component({
  selector: 'app-card-container-select',
  templateUrl: './card-container-select.component.html',
  styleUrls: ['./card-container-select.component.scss']
})
export class CardContainerSelectComponent implements OnInit {

  containers: ContainerData[] = [];

  typeNames = ContainerTypeNames;

  lang = "en" as "en";

  constructor(
    private dashboardService: DashboardService,
    private containerService: ContainerService,
    private navController: NavController
  ) { }

  ngOnInit(): void {
    this.loadContainers();
  }

  private async loadContainers() {
    this.containers = await this.containerService.getContainers();
  }

  async onSelect(container: ContainerData) {
    await this.containerService.addCard(container);

    this.navController.navigateRoot("/");
  }

}
