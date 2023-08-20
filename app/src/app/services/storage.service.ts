import { Injectable } from "@angular/core";
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  async get<T>(key: string): Promise<T | null> {
    const value = await Preferences.get({ key }).then((res) => res.value);

    if (value === null) return null;

    try {
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  }

  async set<T = unknown>(key: string, value: T) {
    return Preferences.set({ key, value: JSON.stringify(value) });
  }
}
