import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type ApiParams = HttpParams | {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private root = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, params?: ApiParams) {
    return this.http.get<T>(this.root + "/" + endpoint, { params }).toPromise();
  }
}
