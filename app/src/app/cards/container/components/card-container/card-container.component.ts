import { Component, Input, OnInit } from '@angular/core';
import { ContainerData } from 'src/app/cards/container/schema/container-data';
import { Card } from 'src/app/schema/card';
import { CardComponent } from 'src/app/schema/card-component';
import { ContainerTypeNames } from '../../schema/container-type';
@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements CardComponent, OnInit {

  typeNames = ContainerTypeNames;

  lang = "cs" as "cs";

  @Input() card!: Card<ContainerData>;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
