import { Component, Input, OnInit } from '@angular/core';
import { ParkingData } from 'src/app/cards/schema/parking-data';
import { CardComponent } from '../../cards';

@Component({
  selector: 'app-card-parking',
  templateUrl: './card-parking.component.html',
  styleUrls: ['./card-parking.component.scss']
})
export class CardParkingComponent implements CardComponent, OnInit {

  @Input() data!: ParkingData;

  constructor() { }

  ngOnInit(): void {
  }

}
