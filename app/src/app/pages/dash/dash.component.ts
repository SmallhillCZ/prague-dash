import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';

@UntilDestroy()
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  pages: { cards: Card[]; }[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.dashboard
      .pipe(untilDestroyed(this))
      .pipe(map(dash => dash?.cards || []))
      .subscribe(cards => this.pages = [{ cards }]);

  }

  trackCardChanges(index: number, item: Card) {
    return item.id;
  }

}
