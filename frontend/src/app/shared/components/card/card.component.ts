import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Card } from "src/app/schema/card";

@Component({
    selector: "pd-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
    standalone: false
})
export class CardComponent implements OnInit, OnChanges {
  color?: string;

  classes: any = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.classes = {};
    if (this.color) {
      this.classes["color-" + this.color] = true;
    }
  }
}
