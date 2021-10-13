import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardSettingsComponent } from 'src/app/schema/card-settings-component';
import { ContainerCard, ContainerCardDefinition } from '../../schema/container-card';

@Component({
  selector: 'app-card-container-settings',
  templateUrl: './card-container-settings.component.html',
  styleUrls: ['./card-container-settings.component.scss']
})
export class CardContainerSettingsComponent implements CardSettingsComponent, OnInit {

  @Input() card!: ContainerCard;

  @Output() change = new EventEmitter<ContainerCardDefinition>();


  constructor() { }

  ngOnInit(): void {
  }

  save() {
    this.change.emit(this.card.definition);
  }
}