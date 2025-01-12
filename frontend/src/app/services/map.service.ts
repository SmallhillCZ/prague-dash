import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MapService {
  SMap?: Promise<any>;

  constructor() {
    this.SMap = new Promise<any>(async (resolve, reject) => {
      const loader = await this.loadScript();

      loader.async = true;
      loader.load(null, { poi: true }, () => {
        const win = window as any;
        resolve(win.SMap);
      });
    });
  }

  private async loadScript() {
    const win = window as any;
    const SMapLoader = win.Loader;

    if (SMapLoader) {
      return Promise.resolve(SMapLoader);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://api.mapy.cz/loader.js`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const SMapLoader2 = win.Loader;
        if (SMapLoader2) {
          resolve(SMapLoader2);
        } else {
          reject("mapy.cz not available");
        }
      };
    });
  }
}
