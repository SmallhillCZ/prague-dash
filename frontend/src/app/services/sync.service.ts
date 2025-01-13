import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import axios from "axios";
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  mergeMap,
  share,
  skip,
} from "rxjs";
import { Logger } from "src/logger";
import { Dashboard } from "../schema/dashboard";
import { DashboardService } from "./dashboard.service";

@Injectable({
  providedIn: "root",
})
export class SyncService {
  private logger = new Logger("SyncService");

  isAuthenticated = this.authService.isAuthenticated$;

  accessToken = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
  ) {
    this.authService.isAuthenticated$
      .pipe(filter((isAuthenticated) => isAuthenticated))
      .pipe(mergeMap(() => this.getToken()))
      .subscribe(this.accessToken);
  }

  async enableSync() {
    const userId$ = this.authService.user$
      .pipe(map((user) => user?.sub))
      .pipe(filter((user): user is NonNullable<typeof user> => !!user))
      .pipe(distinctUntilChanged())
      .pipe(share());

    const accessToken$ = this.accessToken
      .pipe(filter((accessToken): accessToken is NonNullable<typeof accessToken> => !!accessToken))
      .pipe(distinctUntilChanged())
      .pipe(share());

    const dashboardChanges$ = this.dashboardService.dashboard
      .pipe(filter((dashboard): dashboard is NonNullable<typeof dashboard> => !!dashboard))
      .pipe(map((dash) => JSON.parse(JSON.stringify(dash))))
      .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .pipe(share());

    // load dashboard at start
    const [userId, accessToken] = await firstValueFrom(combineLatest([userId$, accessToken$]));

    const dashboard = await this.loadDashboard(userId, accessToken);

    if (dashboard) {
      try {
        this.dashboardService.saveDashboard(dashboard);
      } catch (e) {
        console.error("Error saving dashboard", e);
      }
    }

    // set up saving of updated dashboard
    combineLatest([userId$, accessToken$, dashboardChanges$])
      .pipe(skip(1))
      .subscribe(async ([userId, accessToken, dash]) => {
        await this.saveDashboard(userId, accessToken, dash);
      });
  }

  login() {
    this.authService.loginWithRedirect({
      appState: { target: "/settings" },
      authorizationParams: {
        audience: `https://prague-dash.eu.auth0.com/api/v2/`,
        scope: "read:current_user create:current_user_metadata update:current_user_metadata update:users",
      },
    });
  }

  logout() {
    this.authService.logout({});
  }

  private getToken() {
    const accessToken = this.authService.getAccessTokenSilently({
      authorizationParams: {
        audience: `https://prague-dash.eu.auth0.com/api/v2/`,
        scope: "read:current_user create:current_user_metadata update:current_user_metadata update:users",
      },
    });

    return accessToken;
  }

  async loadDashboard(userId: string, accessToken: string) {
    const user = await axios.get(`https://prague-dash.eu.auth0.com/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const dashboard = user.data.user_metadata.dashboard as Dashboard | undefined;

    this.logger.verbose("loaded dashboard", dashboard);
    return dashboard;
  }

  async saveDashboard(userId: string, accessToken: string, dashboard: any) {
    const body = {
      user_metadata: {
        dashboard,
      },
    };

    await axios.patch(`https://prague-dash.eu.auth0.com/api/v2/users/${userId}`, body, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    this.logger.verbose("saved dashboard", dashboard);
  }
}
