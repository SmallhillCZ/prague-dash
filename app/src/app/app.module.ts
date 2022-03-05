import "@angular/common/locales/global/cs";
import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicRouteStrategy } from "@ionic/angular";
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
  imports: [SharedModule, BrowserModule, AppRoutingModule, CardsModule],
  providers: [
    { provide: LOCALE_ID, useValue: "cs-CZ" },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: DashBoardMigrations, deps: [StorageService], multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
