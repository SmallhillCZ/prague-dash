import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

export interface LoadDeparturesOptions {
  allPlatforms?: boolean;
  name?: string;
  platforms: { [id: string]: boolean } | string[];
  limit?: number;
  offset?: number;
}

@Injectable({
  providedIn: "root",
})
export class DepartureBoardsService {
  constructor(private api: ApiService) {}

  async loadDepartures(options: LoadDeparturesOptions) {
    // const options = {

    // };
    // if (options.allPlatforms) {
    //   return this.getDepartureBoard({ name: definition.name, limit: definition.limit, offset: definition.offset });
    // }
    // else {
    //   const id =
    //   return await this.getDepartureBoard({ name: definition.name, id, limit: definition.limit, offset: definition.offset });
    // }
    let platforms: string[] | undefined;

    if (options.allPlatforms) {
      platforms = undefined;
    } else if (Array.isArray(options.platforms)) {
      platforms = options.platforms;
    } else if (typeof options.platforms === "object") {
      platforms = Object.entries(options.platforms)
        .filter((entry) => !!entry[1])
        .map((entry) => entry[0]);
    }

    const params = {
      name: !!options.name ? [options.name] : undefined,
      limit: options.limit,
      offset: options.offset,
      id: !!platforms ? platforms : undefined,
    };

    return this.api.PublicTransportApi.getDepartureBoard(params).then((res) => res.data);
  }
}
