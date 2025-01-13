import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "pd-circle-chart",
    templateUrl: "./circle-chart.component.html",
    styleUrls: ["./circle-chart.component.scss"],
    standalone: false
})
export class CircleChartComponent implements OnInit {
  @Input() percentage!: number;
  @Input() color = "#000";
  @Input() bgColor = "#fff";

  constructor() {}

  ngOnInit(): void {}
}
