import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private root = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string) {
    return this.http.get<T>(this.root + "/" + endpoint).toPromise();
  }
}
