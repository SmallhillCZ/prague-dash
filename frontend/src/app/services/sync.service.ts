import { Injectable } from "@angular/core";
import { AuthService, User } from "@auth0/auth0-angular";
import axios from "axios";
import { BehaviorSubject, combineLatest, filter, mergeMap } from "rxjs";
import { DashboardService } from "./dashboard.service";

@Injectable({
  providedIn: "root",
})
export class SyncService {
  isAuthenticated = this.authService.isAuthenticated$;

  accessToken = new BehaviorSubject<string | undefined>(undefined);

  constructor(private authService: AuthService,private dashboardService: DashboardService) {
    this.authService.isAuthenticated$
      .pipe(filter((isAuthenticated) => isAuthenticated))
      .pipe(mergeMap(() => this.getToken()))
      .subscribe(this.accessToken);

    this.accessToken.subscribe((token) => console.log("token", token));

    combineLatest([this.authService.user$,this.accessToken, this.dashboardService.dashboard])
          .pipe(filter(([user,accessToken, dash]) => !!user && !!accessToken && !!dash))
          .subscribe(([user,accessToken, dash]) => this.saveDashboard(user,dash));
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

    console.log("got token", accessToken);

    return accessToken;
  }

  async saveDashboard(user:User,dashboard: any) {
    console.log("saving dashboard", dashboard, this.accessToken.value);
    if (!this.accessToken.value) return;

    const body = {
      user_metadata: {
        dashboard,
      },
    };

    const response = await axios.patch(`https://prague-dash.eu.auth0.com/api/v2/users/${user.}`, body, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken.value}`,
      },
    });
  }
}
