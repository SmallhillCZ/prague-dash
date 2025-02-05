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
import { DashEditComponent } from "./components/dash-edit/dash-edit.component";
import { DashBoardMigrations } from "./migrations/dashboard.migration";
import { DashCardAddComponent } from "./pages/dash-card-add/dash-card-add.component";
import { DashEditPageComponent } from "./pages/dash-edit-page/dash-edit-page.component";
import { DashComponent } from "./pages/dash/dash.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { StorageService } from "./services/storage.service";
import { SharedModule } from "./shared/shared.module";
// import function to register Swiper custom elements
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { AuthClientConfig, authHttpInterceptorFn, provideAuth0 } from "@auth0/auth0-angular";
import { register } from "swiper/element/bundle";
import { AccountSettingsComponent } from "./components/account-settings/account-settings.component";
import { GlobalSettingsComponent } from "./components/global-settings/global-settings.component";
import { ConfigService } from "./services/config.service";

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
    GlobalSettingsComponent,
    AccountSettingsComponent,
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
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "cs-CZ" },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      await Promise.all([configService.loadConfig(), DashBoardMigrations(inject(StorageService))]);

      const authClientConfig = inject(AuthClientConfig);
      authClientConfig.set({
        domain: "prague-dash.eu.auth0.com",
        clientId: "DHJ14XWpTf5zNgo3RmXYiZRT2C1pXFeC",
        authorizationParams: {
          redirect_uri: window.location.origin + "/settings",
          scope: "read:current_user create:current_user_metadata update:current_user_metadata update:users",
        },
      });
    }),
    provideAuth0(),

    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
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
