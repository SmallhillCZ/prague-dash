import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  defaultPositionOptions: PositionOptions = {
    enableHighAccuracy: true,
  };

  constructor() {}

  async getCurrentPosition(options: PositionOptions = {}): Promise<GeolocationPosition | null> {
    if (!navigator.geolocation) return null;

    options = Object.assign({}, this.defaultPositionOptions, options);

    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }
}
