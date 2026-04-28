import { Injectable } from "@angular/core";
import { SDK } from "src/sdk";

@Injectable({
  providedIn: "root",
})
export class ApiService extends SDK {
  constructor() {
    super({
      basePath: "/",
    });
  }
}
