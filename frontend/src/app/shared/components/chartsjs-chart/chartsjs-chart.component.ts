import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, registerables } from "chart.js";

Chart.register(...registerables);

import "chartjs-adapter-luxon";

@Component({
    selector: "pd-chartsjs-chart",
    templateUrl: "./chartsjs-chart.component.html",
    styleUrls: ["./chartsjs-chart.component.scss"],
    standalone: false
})
export class ChartsjsChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() height!: number | string;
  @Input() width!: number | string;

  @Input() type!: ChartType;
  @Input() data!: ChartData;
  @Input() options?: ChartOptions;

  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;

  chart?: Chart;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart() {
    if (this.chart) this.chart.destroy();

    const config: ChartConfiguration = {
      type: this.type,
      data: this.data,
      options: this.parseOptions(this.options),
    };

    this.chart = new Chart(this.canvas.nativeElement, config);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.chart) return;

    if (changes["type"]) {
      this.renderChart();
      return;
    }

    if (changes["data"]) {
      // TODO: update data
      this.renderChart();
      this.chart.data = this.data;
    }

    if (changes["options"]) {
      this.chart.options = this.parseOptions(this.options);
    }

    this.chart.update();
  }

  private parseOptions(options?: ChartOptions): ChartOptions {
    return {
      ...options,
      responsive: true,
      maintainAspectRatio: false,
      locale: "cs-CZ",
    };
  }
}
