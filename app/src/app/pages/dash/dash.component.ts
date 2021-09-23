import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  cards = this.dashboardService.dashboard
    .pipe(map(dash => dash?.cards || []));

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

}
