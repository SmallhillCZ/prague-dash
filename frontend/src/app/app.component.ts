import { Component, ViewChild } from "@angular/core";
import { IonicModule, IonRouterOutlet } from "@ionic/angular";
import { SyncService } from "./services/sync.service";

@Component({
  selector: "pd-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  imports: [IonicModule],
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
