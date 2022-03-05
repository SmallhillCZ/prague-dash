import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppSettings } from 'src/app/schema/app-settings';
import { Language } from 'src/app/schema/language';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  lang = Language.cs;

  settings = new BehaviorSubject<AppSettings | undefined>(undefined);

  constructor(
    private storage: StorageService
  ) {
    this.loadSettings();
  }

  async getSettings(): Promise<AppSettings> {
    const data = await this.storage.get("settings");
    return Object.assign(new AppSettings(), data);
  }

  async loadSettings() {
    const data = await this.getSettings();
    this.settings.next(data);
  }

  async saveSettings(data: AppSettings) {
    this.storage.set("settings", data);
    return this.loadSettings();
  }
}
