import { Injectable } from "@angular/core";
import axios, { AxiosResponse } from "axios";
import { environment } from "src/environments/environment";

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
export class ApiService {
  private root = environment.apiRoot;
  private http = axios.create({});

  constructor() {}

  async get<T>(endpoint: string, params: ApiParams = {}) {
    const url = this.root + "/" + endpoint;

    if (!environment.production) console.debug(`Sending HTTP request`, { url, params });

    const res = await this.http.get<T>(url, { params });

    if (res.status >= 300) {
      throw new ApiError(res);
    }

    if (!environment.production) console.debug(`Receiving HTTP response`, res);

    return res.data;
  }
}
