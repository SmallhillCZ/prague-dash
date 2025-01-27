import { Injectable } from "@nestjs/common";
import { GolemioOldService } from "src/golemio/services/golemio-old.service";
import { DepartureBoardResponse } from "../schema/departure-board-response";

export interface GetDepartureBoardOptions {
  name?: string | string[];
  id?: string | string[];
  limit?: number;
  offset?: number;
}

@Injectable()
export class DepartureBoardsService {
  constructor(private golemio: GolemioOldService) {}

  async getDepartureBoard(options: GetDepartureBoardOptions) {
    if (!options.name && !options.id) {
      throw new Error("You have to select name or id");
    }

    const params = {
      names: typeof options.name === "string" ? [options.name] : options.name,
      ids: typeof options.id === "string" ? [options.id] : options.id,
      // filter: "routeHeadingOnce",
      skip: ["canceled"],
      limit: options.limit ? Math.min(options.limit, 20) : 5,
      offset: options.offset,
    };

    try {
      return await this.golemio.get<DepartureBoardResponse[]>("pid/departureboards", params).then((res) => res.data);
    } catch (err: any) {
      if (err.response.status === 404) return undefined;
      throw err;
    }
  }
}
