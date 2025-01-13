import { Component, Input, OnInit } from "@angular/core";
import { DepartureData } from "../../schema/departure-board-data";

@Component({
    selector: "pd-route-badge",
    templateUrl: "./route-badge.component.html",
    styleUrls: ["./route-badge.component.scss"],
    standalone: false
})
export class RouteBadgeComponent implements OnInit {
  @Input()
  departure!: DepartureData;

  constructor() {}

  ngOnInit(): void {}
}
