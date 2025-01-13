import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CARDS } from "src/app/schema/cards-token";
import { SharedModule } from "src/app/shared/shared.module";
import { AstronomicalRoutingModule } from "./astronomical-routing.module";
import { SunCardComponent } from "./components/sun-card/sun-card.component";
import { SunSettingsComponent } from "./components/sun-settings/sun-settings.component";
import { SunCardType } from "./sun.card-type";

@NgModule({
  declarations: [SunCardComponent, SunSettingsComponent],
  imports: [CommonModule, SharedModule, AstronomicalRoutingModule],
  providers: [{ provide: CARDS, multi: true, useValue: SunCardType }],
})
export class AstronomicalModule {}
