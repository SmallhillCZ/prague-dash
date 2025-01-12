import "@angular/common/locales/global/cs";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, inject, isDevMode, provideAppInitializer } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardsModule } from "./cards/cards.module";
import { DashCardComponent } from "./components/dash-card/dash-card.component";
import { DashBoardMigrations } from "./migrations/dashboard.migration";
import { DashCardAddComponent } from "./pages/dash-card-add/dash-card-add.component";
import { DashEditPageComponent } from "./pages/dash-edit-page/dash-edit-page.component";
import { DashEditComponent } from "./pages/dash-edit/dash-edit.component";
import { DashComponent } from "./pages/dash/dash.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { StorageService } from "./services/storage.service";
import { SharedModule } from "./shared/shared.module";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";

@NgModule({
  declarations: [
    AppComponent,

    /* PAGES */
    SettingsComponent,
    DashComponent,
    DashCardAddComponent,
    DashEditComponent,
    DashEditPageComponent,

    /* COMPONENTS */
    DashCardComponent,
  ],
  imports: [
    IonicModule.forRoot({}),
    FormsModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    CardsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
    // provideAuth0({
    //   domain: "dev-ljtl0l4e.us.auth0.com",
    //   clientId: "b0C4kHrNEflWhYt04s4QLTNo510ieb3z",
    //   authorizationParams: {
    //     redirect_uri: window.location.origin,
    //   },
    // }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "cs-CZ" },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAppInitializer(() => {
      const initializerFn = DashBoardMigrations(inject(StorageService));
      return initializerFn();
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor() {
    // register Swiper custom elements
    register();
  }
}
