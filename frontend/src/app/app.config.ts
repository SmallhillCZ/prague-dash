import "@angular/common/locales/global/cs";
import { DatePipe } from "@angular/common";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, isDevMode, LOCALE_ID } from "@angular/core";
import { provideRouter, RouteReuseStrategy } from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";
import { authHttpInterceptorFn, provideAuth0 } from "@auth0/auth0-angular";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
// import function to register Swiper custom elements
import { register as registerSwiper } from "swiper/element/bundle";
import { AirQualityStationCardType } from "./cards/air-quality/air-quality-station-card-type";
import { SunCardType } from "./cards/astronomical/sun.card-type";
import { ContainerCardType } from "./cards/container/container-card-type";
import { DepartureBoardsCardType } from "./cards/public-transport/departure-boards-card-type";
import { CARDS } from "./schema/cards-token";
import { routes } from "./app.routes";

// register Swiper custom elements
registerSwiper();

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: "cs-CZ" },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    importProvidersFrom(IonicModule.forRoot({})),

    provideRouter(routes),

    provideAuth0(),

    provideHttpClient(withInterceptors([authHttpInterceptorFn])),

    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),

    DatePipe,

    { provide: CARDS, multi: true, useValue: AirQualityStationCardType },
    { provide: CARDS, multi: true, useValue: DepartureBoardsCardType },
    { provide: CARDS, multi: true, useValue: SunCardType },
    { provide: CARDS, multi: true, useValue: ContainerCardType },
  ],
};
