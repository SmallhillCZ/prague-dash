import { Component, OnInit, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform, ViewDidEnter } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements ViewDidEnter {
  title = 'prague-dash';

  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet!: IonRouterOutlet;

  constructor(
    private platform: Platform,
  ) {

    // Quit on back button when on root page
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ionViewDidEnter() {
    SplashScreen.hide();
  }


}
