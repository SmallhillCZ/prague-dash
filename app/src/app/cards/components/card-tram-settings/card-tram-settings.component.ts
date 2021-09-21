import { Component, Input, OnInit } from '@angular/core';
import { TramData } from '../../schema/tram-data';

@Component({
  selector: 'app-card-tram-settings',
  templateUrl: './card-tram-settings.component.html',
  styleUrls: ['./card-tram-settings.component.scss']
})
export class CardTramSettingsComponent implements OnInit {

  @Input() data!: TramData;

  constructor() { }

  ngOnInit(): void {
  }

}
