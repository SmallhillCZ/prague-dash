import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Duration } from 'luxon';
import { Language } from 'src/app/schema/language';
import { ContainerCard } from '../../schema/container-card';
import { ContainerDataType } from '../../schema/container-data';
import { ContainerTypes } from '../../schema/container-type';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'app-container-detail-card',
  templateUrl: './container-detail-card.component.html',
  styleUrls: ['./container-detail-card.component.scss']
})
export class ContainerDetailCardComponent implements OnInit {

  @Input() card!: ContainerCard;
  @Input() type!: ContainerDataType;

  lang = Language.cs;

  open: boolean = false;

  chartData: ChartData = { datasets: [{ data: [] }] };
  chartOptions: ChartOptions = {
    scales: {
      horizontal: {
        axis: "x",
        type: 'time',
        time: {
          unit: "hour"
        }
      },
      vertical: {
        axis: "y",
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  constructor(
    private containerService: ContainerService
  ) { }

  ngOnInit(): void {
  }

  async loadHistory() {
    const data = await this.containerService.getHistory(this.card.definition.id, this.type.type);
    this.chartData = {
      labels: data.map(item => item.timestamp),
      datasets: [
        { data: data.map(item => item.occupancy) }
      ]
    };
  }

  async toggleDetail() {
    if (this.open) {
      this.open = false;
    }
    else {
      if (this.chartData.datasets[0].data.length === 0) {
        await this.loadHistory();
      }
      this.open = true;
    }
  }


  getContainerTypeTitle(type: ContainerDataType, lang: Language): string {
    return ContainerTypes[type.type].title[lang]!;
  }

  parseCleaningFrequency(cleaningFrequency: ContainerDataType["cleaning_frequency"], lang: Language): string {
    const duration = Duration.fromISO(cleaningFrequency.duration);

    const numbers = ["jednou", "dvakrát", "třikrát", "čtyřikrát", "pětkrát", "šestkrát", "sedmkrát", "osmkrát"];
    let frequency = cleaningFrequency.frequency > numbers.length ? `${cleaningFrequency.frequency} krát` : numbers[cleaningFrequency.frequency - 1];

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
