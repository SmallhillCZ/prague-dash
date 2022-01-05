import { Component, OnInit } from '@angular/core';
import { ItemReorderCustomEvent, NavController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Dashboard, DashboardPage } from 'src/app/schema/dashboard';

@UntilDestroy()
@Component({
  selector: 'app-dash-edit',
  templateUrl: './dash-edit.component.html',
  styleUrls: ['./dash-edit.component.scss']
})
export class DashEditComponent implements OnInit {

  dashboard?: Dashboard;

  sortPages: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private navController: NavController
  ) { }

  ngOnInit(): void {
    this.dashboardService.dashboard
      .pipe(untilDestroyed(this)).subscribe(dash => this.dashboard = dash);
  }

  onReorder(event: ItemReorderCustomEvent) {
    this.dashboard?.pages.splice(event.detail.to, 0, ...this.dashboard?.pages.splice(event.detail.from, 1));
    event.detail.complete(true);
  }

  onPageClick(page: DashboardPage) {
    if (this.sortPages) return;
    this.navController.navigateForward(`/page/${page.id}/edit`);
  }
}
