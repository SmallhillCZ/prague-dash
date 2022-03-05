import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "pd-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarChartComponent implements OnInit {
  @Input()
  percentage!: number;

  constructor() {}

  ngOnInit(): void {}
}
