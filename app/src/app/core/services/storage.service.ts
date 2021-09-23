import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async get<T>(name: string): Promise<T | null> {
    const value = window.localStorage.getItem(name);

    if (value === null) return null;

    try {
      return JSON.parse(value) as T;
    }
    catch (err) {
      return null;
    }
  }

  async set<T = unknown>(name: string, value: T) {
    return window.localStorage.setItem(name, JSON.stringify(value));
  }
}
