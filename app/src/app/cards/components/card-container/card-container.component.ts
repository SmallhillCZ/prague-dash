import { Component, Input, OnInit } from '@angular/core';
import { ContainerData } from 'src/app/cards/schema/container-data';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  @Input() data!: ContainerData;

  constructor() { }

  ngOnInit(): void {
  }

}
