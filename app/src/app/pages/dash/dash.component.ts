import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';

@UntilDestroy()
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  // pages: { cards: Card[]; }[] = [];
  cards: Card[] = [];

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.dashboardService.dashboard
      .pipe(untilDestroyed(this))
      .subscribe(dashboard => this.cards = dashboard?.cards || []);
  }



  doRefresh(event: any) {

    this.cards = JSON.parse(JSON.stringify(this.cards));

    setTimeout(() => {
      event.target?.complete();
    }, 500);
  }

}
