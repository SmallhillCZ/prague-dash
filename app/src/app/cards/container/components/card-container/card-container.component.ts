import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CardComponent } from 'src/app/schema/card-component';
import { ContainerCard } from '../../schema/container-card';
import { ContainerTypeNames } from '../../schema/container-type';
import { ContainerService } from '../../services/container.service';

@UntilDestroy()
@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements CardComponent, OnInit {

  typeNames = ContainerTypeNames;

  lang = "cs" as "cs";

  @Input() card!: ContainerCard;

  types?: { name: string, occupancy: number; }[];

  loadingTypes = Array(3).fill(null);

  constructor(
    private containerService: ContainerService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const data = await this.containerService.getContainer(this.card.definition.id);
    this.types = data.types
      .filter(item => this.card.definition?.showNotMetered || !!item.occupancy)
      .map(item => ({ name: this.typeNames[item.type][this.lang], occupancy: item.occupancy }));

    this.types.sort((a, b) => {
      if (a.occupancy === null) return 1;
      if (b.occupancy === null) return -1;
      return a.name.localeCompare(b.name);
    });
  }
}