import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FrontendConfigResponse } from "src/sdk";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  config = new BehaviorSubject<FrontendConfigResponse | null>(null);

  constructor(private api: ApiService) {}

  async loadConfig() {
    const config = await this.api.RootApi.getFrontendConfig().then((res) => res.data);
    this.config.next(config);
  }
}
