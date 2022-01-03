import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardDetailComponent } from 'src/app/schema/card-detail-component';
import { ContainerCard } from '../../schema/container-card';
import { ContainerTypeNames } from '../../schema/container-type';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'app-card-container-detail',
  templateUrl: './card-container-detail.component.html',
  styleUrls: ['./card-container-detail.component.scss']
})
export class CardContainerDetailComponent implements CardDetailComponent, OnInit {

  @Output() title = new EventEmitter<string>();

  types?: { name: string, occupancy: number; }[];

  lang = "cs" as "cs";

  constructor(
    private containerService: ContainerService
  ) { }

  @Input() card!: ContainerCard;

  ngOnInit(): void {
    this.loadData(this.card);
  }

  async loadData(card: ContainerCard) {
    const data = await this.containerService.getContainer(card.definition.id);
    this.title.next(`♻️ ${data.location}`);

    this.types = data.types
      .filter(item => this.card.definition?.showNotMetered || !!item.occupancy)
      .map(item => ({ name: ContainerTypeNames[item.type][this.lang], occupancy: item.occupancy }));

    this.types.sort((a, b) => {
      if (a.occupancy === null) return 1;
      if (b.occupancy === null) return -1;
      return a.name.localeCompare(b.name);
    });
  }

}
