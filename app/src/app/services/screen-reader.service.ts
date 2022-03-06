import { Injectable } from '@angular/core';
import { ScreenReader, SpeakOptions } from '@capacitor/screen-reader';

@Injectable({
  providedIn: 'root'
})
export class ScreenReaderService {

  language = "cs";

  constructor() { }

  async isEnabled() {
    return ScreenReader.isEnabled();
  }

  async speak(value: string) {
    return ScreenReader.speak({ value, language: this.language });
  }
}
