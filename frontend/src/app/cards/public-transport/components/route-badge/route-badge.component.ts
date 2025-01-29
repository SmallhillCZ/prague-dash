import { Component, Input, OnInit } from "@angular/core";
import { DepartureBoardItem } from "src/sdk";

@Component({
  selector: "pd-route-badge",
  templateUrl: "./route-badge.component.html",
  styleUrls: ["./route-badge.component.scss"],
  standalone: false,
})
export class RouteBadgeComponent implements OnInit {
  @Input()
  departure!: DepartureBoardItem;

  constructor() {}

  ngOnInit(): void {}
}
