import { inject, provideAppInitializer } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { AuthClientConfig } from "@auth0/auth0-angular";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { DashBoardMigrations } from "./app/migrations/dashboard.migration";
import { ConfigService } from "./app/services/config.service";
import { StorageService } from "./app/services/storage.service";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAppInitializer(() => {
      console.log("App Initializer: Loading configuration and running migrations...");
      const configService = inject(ConfigService);

      const authClientConfig = inject(AuthClientConfig);
      authClientConfig.set({
        domain: "prague-dash.eu.auth0.com",
        clientId: "DHJ14XWpTf5zNgo3RmXYiZRT2C1pXFeC",
        authorizationParams: {
          redirect_uri: window.location.origin + "/settings",
          scope: "read:current_user create:current_user_metadata update:current_user_metadata update:users",
        },
      });

      return Promise.all([configService.loadConfig(), DashBoardMigrations(inject(StorageService))]);
    }),
  ],
}).catch((err) => console.error(err));
