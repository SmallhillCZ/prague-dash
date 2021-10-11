import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/schema/card';
import { CardSettingsComponent } from 'src/app/schema/card-settings-component';
import { DepartureBoardCard, DepartureBoardCardDefinition } from '../../schema/departure-board-card';
import { DepartureBoardData } from '../../schema/departure-board-data';

@Component({
  selector: 'app-departure-board-settings',
  templateUrl: './departure-board-settings.component.html',
  styleUrls: ['./departure-board-settings.component.scss']
})
export class DepartureBoardSettingsComponent implements CardSettingsComponent, OnInit, OnChanges {

  @Input()
  card!: DepartureBoardCard;

  @Output()
  change = new EventEmitter<DepartureBoardCardDefinition>();

  definition!: DepartureBoardCardDefinition;

  defaultSettings: DepartureBoardCardDefinition = {
    addDelay: false,
    id: undefined,
    limit: 4,
    name: undefined,
    showWheelchairAccessible: false,
    timeDisplay: "time"
  };

  constructor() { }

  ngOnInit(): void {
    this.definition = Object.assign({}, this.defaultSettings, this.card.definition);
  }

  ngOnChanges() {
  }

  save() {
    this.change.emit(this.definition);
  }

}
