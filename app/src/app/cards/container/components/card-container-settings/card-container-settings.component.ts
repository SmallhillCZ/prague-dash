import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/schema/card';

@Component({
  selector: 'app-card-container-settings',
  templateUrl: './card-container-settings.component.html',
  styleUrls: ['./card-container-settings.component.scss']
})
export class CardContainerSettingsComponent implements OnInit {

  @Input() card!: Card;

  constructor() { }

  ngOnInit(): void {
  }

}
