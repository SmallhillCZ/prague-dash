import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class GolemioService {

  private apiRoot = "https://api.golemio.cz/v2";
  private token = this.configService.get<string>('GOLEMIO_TOKEN');

  constructor(
    private configService: ConfigService
  ) { }

  get<T>(endpoint: string, params?: AxiosRequestConfig["params"]) {

    const url = this.getFullUrl(endpoint);

    const requestOptions: AxiosRequestConfig = {
      headers: {
        "x-access-token": this.token
      },
      params
    };

    return axios.get<T>(url, requestOptions);

  }

  private getFullUrl(endpoint: string) {
    return this.apiRoot + "/" + endpoint;
  }
}
