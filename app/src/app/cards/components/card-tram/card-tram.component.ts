import { Component, Input, OnInit } from '@angular/core';
import { TramData } from 'src/app/cards/schema/tram-data';
import { CardComponent } from 'src/app/cards/cards';


@Component({
  selector: 'app-card-tram',
  templateUrl: './card-tram.component.html',
  styleUrls: ['./card-tram.component.scss']
})
export class CardTramComponent implements CardComponent, OnInit {

  @Input() data!: TramData;

  constructor() { }

  ngOnInit(): void {
  }

}
