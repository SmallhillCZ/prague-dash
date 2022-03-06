import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";

export type MapMarkerIconDirection = number | "left" | "right";
@Component({
  selector: "pd-map-marker",
  templateUrl: "./map-marker.component.html",
  styleUrls: ["./map-marker.component.scss"],
})
export class MapMarkerComponent implements OnInit, OnChanges {
  @Input() coords!: [number, number];
  @Input() pointer: boolean = false;
  @Input() icon?: string;
  @Input() iconDirection?: MapMarkerIconDirection;
  @Input() bearing?: number;

  changes = new Subject<SimpleChanges>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.changes.next(changes);
  }
}
