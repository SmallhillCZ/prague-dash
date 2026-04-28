import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DepartureBoardItem } from "src/sdk";
import { DepartureStylePipe } from "../../pipes/departure-style.pipe";

@Component({
  selector: "pd-route-badge",
  templateUrl: "./route-badge.component.html",
  styleUrls: ["./route-badge.component.scss"],
  imports: [CommonModule, IonicModule, DepartureStylePipe],
})
export class RouteBadgeComponent implements OnInit {
  @Input()
  departure!: DepartureBoardItem;

  constructor() {}

  ngOnInit(): void {}
}
