import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  readonly config: any;

  constructor() {}

  async loadConfig() {
    await axios.get("/config.json").then((res) => res.data);
  }
}
