import { Component, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { ScreenReader } from '@capacitor/screen-reader';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonRouterOutlet, Platform, ViewDidEnter } from '@ionic/angular';
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

    this.init();
  }

  ionViewDidEnter() {

  }

  async init() {
    // Quit on back button when on root page
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });

    if (this.platform.is("android")) {
      // StatusBar.setOverlaysWebView({ overlay: true });      
      // TODO: make bg image under, but not header
    }

    ScreenReader.addListener('stateChange' as any, ({ value }) => {
      console.log(`Screen reader is now ${value ? 'on' : 'off'}`);
    });

    await SplashScreen.hide();
  }


}
