import "@angular/common/locales/global/cs";
import { ApplicationConfig, LOCALE_ID } from "@angular/core";
import { RouteReuseStrategy } from "@angular/router";
import { IonicRouteStrategy } from "@ionic/angular";
// import function to register Swiper custom elements
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authHttpInterceptorFn, provideAuth0 } from "@auth0/auth0-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: "cs-CZ" },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideAuth0(),

    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
  ],
};
