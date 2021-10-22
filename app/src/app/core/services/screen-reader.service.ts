import { Injectable } from '@angular/core';
import { ScreenReader, SpeakOptions } from '@capacitor/screen-reader';

@Injectable({
  providedIn: 'root'
})
export class ScreenReaderService {

  constructor() { }

  async isEnabled() {
    return ScreenReader.isEnabled();
  }

  async speak(options: SpeakOptions) {
    return ScreenReader.speak(options);
  }
}
