import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "pd-bar-chart",
    templateUrl: "./bar-chart.component.html",
    styleUrls: ["./bar-chart.component.scss"],
    standalone: false
})
export class BarChartComponent implements OnInit {
  @Input()
  percentage!: number;

  constructor() {}

  ngOnInit(): void {}
}
