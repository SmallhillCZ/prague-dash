import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ContainerCard, ContainerCardDefinition } from "../../schema/container-card";

@Component({
  selector: "app-card-container-settings",
  templateUrl: "./card-container-settings.component.html",
  styleUrls: ["./card-container-settings.component.scss"],
})
export class CardContainerSettingsComponent implements OnInit {
  // TODO:
  card!: ContainerCard;

  change = new EventEmitter<ContainerCardDefinition>();

  constructor() {}

  ngOnInit(): void {}

  save() {
    this.change.emit(this.card.definition);
  }
}
