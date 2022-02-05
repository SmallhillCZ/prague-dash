import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';
import { Http, HttpOptions, HttpParams, HttpResponse } from '@capacitor-community/http';
import { environment } from 'src/environments/environment';

export type ApiParams = {
  [key: string]: string | string[] | number | number[] | undefined;
};

export class ApiError extends Error {

  status: number;

  constructor(res: HttpResponse) {
    super("ApiError: " + res.status);

    this.status = res.status;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private root = environment.apiRoot;

  constructor() { }

  async get<T>(endpoint: string, params: ApiParams = {}) {

    const options: HttpOptions = {
      url: this.root + "/" + endpoint,
      params: this.stringifyParams(params)
    };

    console.debug(`Sending HTTP request`, options);

    const res = await Http.get(options);

    if (res.status >= 300) {
      throw new ApiError(res);
    }

    console.debug(`Receiving HTTP response`, res);

    return res.data as T;
  }

  private stringifyParams(params: ApiParams): HttpParams {
    const stringParams: HttpParams = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;

      if (Array.isArray(value)) stringParams[key] = value.map(item => String(item));
      else stringParams[key] = String(value);
    });

    return stringParams;
  }
}
