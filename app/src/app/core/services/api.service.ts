import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type ApiParams = HttpParams | {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private root = environment.apiRoot;

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, params?: ApiParams) {
    return this.http.get<T>(this.root + "/" + endpoint, { params }).toPromise();
  }
}
