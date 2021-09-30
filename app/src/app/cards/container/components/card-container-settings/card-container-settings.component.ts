import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Card } from 'src/app/schema/card';
import { CardSettingsComponent } from 'src/app/schema/card-settings-component';
import { ContainerData } from '../../schema/container-data';
import { ContainerSettings } from '../../schema/container-settings';

@Component({
  selector: 'app-card-container-settings',
  templateUrl: './card-container-settings.component.html',
  styleUrls: ['./card-container-settings.component.scss']
})
export class CardContainerSettingsComponent implements CardSettingsComponent, OnInit, OnChanges {

  @Input() card!: Card<ContainerData, ContainerSettings>;

  @Output() change = new EventEmitter<ContainerSettings>();

  settings: ContainerSettings = {};

  constructor() { }

  ngOnInit(): void {
    this.settings = this.card.settings || {};
  }

  ngOnChanges() {
  }

  save() {
    this.change.emit(this.settings);
  }
}