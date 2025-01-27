import { Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import { Config } from "src/config";

@Injectable()
export class GolemioOldService {
  private apiRoot = "https://api.golemio.cz/v2";
  private token = this.config.golemio.token;

  constructor(private config: Config) {}

  get<T>(endpoint: string, params?: AxiosRequestConfig["params"]) {
    const url = this.getFullUrl(endpoint);

    const requestOptions: AxiosRequestConfig = {
      headers: {
        "x-access-token": this.token,
      },
      params,
    };

    return axios.get<T>(url, requestOptions);
  }

  private getFullUrl(endpoint: string) {
    return this.apiRoot + "/" + endpoint;
  }
}
