import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.scss']
})
export class CircleChartComponent implements OnInit {

  @Input() percentage!: number;
  @Input() color = "#000";
  @Input() bgColor = "#fff";


  constructor() { }

  ngOnInit(): void {
  }

}
