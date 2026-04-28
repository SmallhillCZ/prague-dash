import { Injectable } from "@angular/core";
import * as L from "leaflet";
import { filter, firstValueFrom, take } from "rxjs";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: "root",
})
export class MapService {
  constructor(private configService: ConfigService) {}

  async createTileLayer(): Promise<L.TileLayer> {
    const config = await firstValueFrom(
      this.configService.config.pipe(
        filter((c): c is NonNullable<typeof c> => c !== null),
        take(1),
      ),
    );

    return L.tileLayer(`https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${config.mapyComApiKey}`, {
      minZoom: 0,
      maxZoom: 19,
      attribution: '© <a href="https://api.mapy.cz/copyright" target="_blank">Mapy.cz</a>',
    });
  }
}
