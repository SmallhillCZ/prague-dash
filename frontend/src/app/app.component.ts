import { Component, ViewChild } from "@angular/core";
import { IonRouterOutlet, Platform } from "@ionic/angular";

@Component({
  selector: "pd-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: false,
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet!: IonRouterOutlet;

  constructor(private platform: Platform) {}
}
