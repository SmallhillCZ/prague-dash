import { Card } from "src/app/schema/card";
import { SunValueNames, SunValues } from "./sun-values";


export class SunCardDefinition {
  showValues: SunValueNames[] = [
    SunValueNames.sunset,
    SunValueNames.sunrise,
    SunValueNames.dusk,
    SunValueNames.dawn,
  ];
}

export type SunCard = Card<"sunset", SunCardDefinition>;