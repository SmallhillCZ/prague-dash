import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  get<T>(key: string): T | null {
    const value = window.localStorage.getItem(key);

    if (value === null) return null;

    try {
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  }

  set<T = unknown>(key: string, value: T) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
}
