import { Injectable } from "@angular/core";
import axios, { AxiosResponse } from "axios";
import { SDK } from "src/sdk";
import { ConfigService } from "./config.service";

export type ApiParams = {
  [key: string]: string | string[] | number | number[] | undefined;
};

export class ApiError extends Error {
  status: number;

  constructor(res: AxiosResponse) {
    super("ApiError: " + res.status);

    this.status = res.status;
  }
}

@Injectable({
  providedIn: "root",
})
export class ApiService extends SDK {
  private http = axios.create({});

  constructor(private configService: ConfigService) {
    super({
      basePath: configService.config.apiRoot,
    });
  }
}
