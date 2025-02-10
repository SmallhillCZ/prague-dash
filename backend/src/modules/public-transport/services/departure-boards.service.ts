import { Injectable } from "@nestjs/common";
import { GolemioClient, GolemioPublicTransportApi } from "golemio-sdk";

export interface GetDepartureBoardOptions {
  name?: string | string[];
  id?: string | string[];
  limit?: number;
  offset?: number;
}

@Injectable()
export class DepartureBoardsService {
  constructor(private golemio: GolemioClient) {}

  async getDepartureBoard(options: GetDepartureBoardOptions) {
    if (!options.name && !options.id) {
      throw new Error("You have to select name or id");
    }

    try {
      const params: GolemioPublicTransportApi.PIDDepartureBoardsV2ApiV2PidDepartureboardsGetQueryParams = {
        names: options.name as string, // FIXME: bad typing in golemio api
        ids: options.id as string, // FIXME: bad typing in golemio api
        // filter: "routeHeadingOnce",
        skip: "canceled",
        limit: options.limit ? Math.min(options.limit, 20) : 5,
        offset: options.offset,
      };

      return await this.golemio.PublicTransport.PIDDepartureBoardsV2Api.v2PidDepartureboardsGet(params).then(
        (res) => res.data,
      );
    } catch (err: any) {
      if (err.response.status === 404) return undefined;
      throw err;
    }
  }
}
