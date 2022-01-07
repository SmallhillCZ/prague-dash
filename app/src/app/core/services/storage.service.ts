import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async get<T>(key: string): Promise<T | null> {
    const value = await Storage.get({ key }).then(res => res.value);

    if (value === null) return null;

    try {
      return JSON.parse(value);
    }
    catch (err) {
      return null;
    }
  }

  async set<T = unknown>(key: string, value: T) {
    return Storage.set({ key, value: JSON.stringify(value) });
  }
}
