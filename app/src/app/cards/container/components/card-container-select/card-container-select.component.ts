import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { CardSelectComponent } from 'src/app/schema/card-select-component';
import { Language } from 'src/app/schema/language';
import { ContainerCardDefinition } from '../../schema/container-card';
import { ContainerData, ContainerDataType } from '../../schema/container-data';
import { ContainerTypes } from '../../schema/container-type';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'app-card-container-select',
  templateUrl: './card-container-select.component.html',
  styleUrls: ['./card-container-select.component.scss']
})
export class CardContainerSelectComponent implements CardSelectComponent, OnInit {

  containers: ContainerData[] = [];

  search: string = "";

  lang = Language.cs;

  @Output()
  select = new EventEmitter<ContainerCardDefinition>();

  constructor(
    private containerService: ContainerService,
  ) { }

  ngOnInit(): void {
    this.loadContainers();
  }

  async loadContainers() {

    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      .then(position => {
        if (position) return { lat: position.coords.latitude, lon: position.coords.longitude };
        else return undefined;
      })
      .catch(err => undefined);

    this.containers = await this.containerService.getContainers({
      search: this.search || undefined,
      coordinates
    });
  }

  async onSelect(container: ContainerData) {
    this.select.emit({ id: container.id });
  }

  getContainerTypeTitle(type: ContainerDataType, lang: Language) {
    return ContainerTypes[type.type].title[lang];
  }

}
