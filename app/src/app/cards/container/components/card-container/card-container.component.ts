import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { timer } from 'rxjs';
import { ContainerData } from 'src/app/cards/container/schema/container-data';
import { Card } from 'src/app/schema/card';
import { CardComponent } from 'src/app/schema/card-component';
import { ContainerSettings } from '../../schema/container-settings';
import { ContainerTypeNames } from '../../schema/container-type';

@UntilDestroy()
@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements CardComponent, OnInit, OnChanges {

  typeNames = ContainerTypeNames;

  lang = "cs" as "cs";

  @Input() card!: Card<ContainerData, ContainerSettings>;

  types: { name: string, occupancy: number; }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.types = this.card.data.types
      .filter(item => this.card.settings?.showNotMetered || !!item.occupancy)
      .map(item => ({ name: this.typeNames[item.type][this.lang], occupancy: item.occupancy }));
  }

  ngOnChanges() {

  }
}
