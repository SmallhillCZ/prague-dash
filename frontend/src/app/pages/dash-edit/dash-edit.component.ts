import { Component, OnInit } from "@angular/core";
import { ItemReorderCustomEvent, NavController } from "@ionic/angular";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { DashboardService } from "src/app/services/dashboard.service";
import { Dashboard, DashboardPage } from "src/app/schema/dashboard";

@UntilDestroy()
@Component({
    selector: "pd-dash-edit",
    templateUrl: "./dash-edit.component.html",
    styleUrls: ["./dash-edit.component.scss"],
    standalone: false
})
export class DashEditComponent implements OnInit {
  dashboard?: Dashboard;

  sortPages: boolean = false;

  constructor(private dashboardService: DashboardService, private navController: NavController) {}

  ngOnInit(): void {
    this.dashboardService.dashboard.pipe(untilDestroyed(this)).subscribe((dash) => (this.dashboard = dash));
  }

  onReorder(event: ItemReorderCustomEvent) {
    if (!this.dashboard) return;

    this.dashboard.pages.splice(event.detail.to, 0, ...this.dashboard?.pages.splice(event.detail.from, 1));

    this.dashboardService.saveDashboard(this.dashboard);

    event.detail.complete(true);
  }

  onPageClick(page: DashboardPage) {
    if (this.sortPages) return;
    this.navController.navigateForward(`/page/${page.id}/edit`);
  }
}
