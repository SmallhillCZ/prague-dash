import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ChartData, ChartOptions, ScriptableLineSegmentContext } from "chart.js";
import { DateTime, Duration } from "luxon";
import { Language } from "src/app/schema/language";
import { ContainerCard } from "../../schema/container-card";
import { ContainerDataType } from "../../schema/container-data";
import { ContainerTypes } from "../../schema/container-type";
import { ContainerService } from "../../services/container.service";

@Component({
  selector: "pd-container-detail-card",
  templateUrl: "./container-detail-card.component.html",
  styleUrls: ["./container-detail-card.component.scss"],
})
export class ContainerDetailCardComponent implements OnInit, OnChanges {
  @Input() card!: ContainerCard;
  @Input() type!: ContainerDataType;

  lang = Language.cs;

  open: boolean = false;

  chartData: ChartData = { datasets: [{ data: [] }] };
  chartOptions: ChartOptions = {
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 2,
      },
    },
    scales: {
      horizontal: {
        axis: "x",
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            hour: "HH",
            day: "d. M.",
            week: "d. M.",
          },
        },
        ticks: {
          minRotation: 45,
        },
      },
      vertical: {
        axis: "y",
        display: false,
        max: 1,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };

  constructor(private containerService: ContainerService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["type"]) {
      if (this.type.occupancy !== null) this.loadHistory();
    }
  }

  async loadHistory() {
    const since = DateTime.local().minus({ days: 7 }).toISODate();
    const history = await this.containerService.getHistory(this.card.definition.id, this.type.type, { since });

    const labels: string[] = [];
    const data: number[] = [];

    history.forEach((item, i) => {
      if (i > 0 && history[i - 1].occupancy - item.occupancy > 0) {
        labels.push(item.timestamp);
        data.push(history[i - 1].occupancy);
      }
      labels.push(item.timestamp);
      data.push(item.occupancy);
    });

    labels.push(DateTime.local().toISOTime());
    data.push(this.type.occupancy);

    this.chartData = {
      labels,
      datasets: [
        {
          data,
          fill: "origin",
          // segment: {
          //   backgroundColor: ctx => this.isUnknown(ctx, "transparent"),
          //   borderDash: ctx => this.isUnknown(ctx, [6, 6]),
          //   borderWidth: ctx => this.isUnknown(ctx, 2),
          // }
        },
      ],
    };
  }

  private isUnknown<T>(ctx: ScriptableLineSegmentContext, value: T): T | undefined {
    return ctx.p0.parsed.y - ctx.p1.parsed.y > 0.2 && ctx.p1.parsed.x - ctx.p0.parsed.x > 1000 * 60 * 60 * 6
      ? value
      : undefined;
  }

  getContainerTypeTitle(type: ContainerDataType, lang: Language): string {
    return ContainerTypes[type.type].title[lang]!;
  }

  parseCleaningFrequency(cleaningFrequency: ContainerDataType["cleaning_frequency"], lang: Language): string {
    const duration = Duration.fromISO(cleaningFrequency.duration);

    const numbers = ["jednou", "dvakrát", "třikrát", "čtyřikrát", "pětkrát", "šestkrát", "sedmkrát", "osmkrát"];
    let frequency =
      cleaningFrequency.frequency > numbers.length
        ? `${cleaningFrequency.frequency} krát`
        : numbers[cleaningFrequency.frequency - 1];

    const durationParts: string[] = [];
    if (duration.days === 1) durationParts.push(`den`);
    if (duration.days === 2) durationParts.push(`dva dny`);
    if (duration.days === 3) durationParts.push(`tři dny`);
    if (duration.days === 4) durationParts.push(`čtyři dny`);
    if (duration.days >= 5) durationParts.push(`${duration.days} dní`);

    if (duration.weeks === 1) durationParts.push(`týden`);
    if (duration.weeks === 2) durationParts.push(`dva týdny`);
    if (duration.weeks === 3) durationParts.push(`tři týdny`);
    if (duration.weeks === 4) durationParts.push(`čtyři týdny`);
    if (duration.weeks >= 5) durationParts.push(`${duration.weeks} týdnů`);

    return `${frequency} za ${durationParts.join(", ")}`;
  }
}
