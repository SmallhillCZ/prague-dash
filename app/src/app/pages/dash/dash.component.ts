import { Component, OnInit } from '@angular/core';
import { ExampleCards } from 'src/app/data/example-cards';
import { Card } from 'src/app/schema/card';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  cards: Card[] = ExampleCards;

  constructor() { }

  ngOnInit(): void {
  }

}
