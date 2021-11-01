import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DepartureBoardData } from '../../schema/departure-board-data';
import { RouteType } from '../../schema/route-type';

@Component({
  selector: 'app-route-badge',
  templateUrl: './route-badge.component.html',
  styleUrls: ['./route-badge.component.scss']
})
export class RouteBadgeComponent implements OnInit {

  @Input()
  route!: DepartureBoardData["departures"][0]["route"];

  constructor() { }

  ngOnInit(): void {
  }

}
