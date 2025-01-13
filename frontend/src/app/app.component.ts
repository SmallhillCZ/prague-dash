import { Component, ViewChild } from "@angular/core";
import { IonRouterOutlet } from "@ionic/angular";
import { SyncService } from "./services/sync.service";

@Component({
  selector: "pd-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: false,
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet!: IonRouterOutlet;

  constructor(
    // load sync
    syncService: SyncService,
  ) {
    syncService.enableSync();
  }
}
