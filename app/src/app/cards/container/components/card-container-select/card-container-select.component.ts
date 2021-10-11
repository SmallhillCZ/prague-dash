import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardSelectComponent } from 'src/app/schema/card-select-component';
import { ContainerService } from '../../services/container.service';
import { ContainerData } from '../../schema/container-data';
import { ContainerTypeNames } from '../../schema/container-type';
import { CreateCardOptions } from 'src/app/schema/create-card-options';
import { ContainerCard } from '../../schema/container-card';

@Component({
  selector: 'app-card-container-select',
  templateUrl: './card-container-select.component.html',
  styleUrls: ['./card-container-select.component.scss']
})
export class CardContainerSelectComponent implements CardSelectComponent, OnInit {

  containers: ContainerData[] = [];

  typeNames = ContainerTypeNames;

  search: string = "";

  lang = "cs" as "cs";

  @Output()
  select = new EventEmitter<CreateCardOptions<ContainerCard>>();

  constructor(
    private containerService: ContainerService,
  ) { }

  ngOnInit(): void {
    this.loadContainers();
  }

  async loadContainers() {
    const options = {
      search: this.search || undefined
    };
    this.containers = await this.containerService.getContainers(options);
  }

  async onSelect(container: ContainerData) {
    this.select.emit({ title: "🗑️ " + container.location, definition: { id: container.id } });
  }

}
