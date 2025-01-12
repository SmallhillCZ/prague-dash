import { Component, ViewChild } from "@angular/core";
import { IonRouterOutlet, Platform, ViewDidEnter } from "@ionic/angular";

@Component({
    selector: "pd-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    standalone: false
})
export class AppComponent implements ViewDidEnter {
  title = "prague-dash";

  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet!: IonRouterOutlet;

  constructor(private platform: Platform) {
    this.init();
  }

  ionViewDidEnter() {}

  async init() {
    if (this.platform.is("android")) {
      // StatusBar.setOverlaysWebView({ overlay: true });
      // TODO: make bg image under, but not header
    }
  }
}
