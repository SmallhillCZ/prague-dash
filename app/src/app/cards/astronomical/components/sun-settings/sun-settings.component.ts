import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SunCard, SunCardDefinition } from "../../schema/sun-card";
import { SunValueNames, SunValues, SunValuesMeta } from "../../schema/sun-values";

@Component({
  selector: "app-sun-settings",
  templateUrl: "./sun-settings.component.html",
  styleUrls: ["./sun-settings.component.scss"],
})
export class SunSettingsComponent implements OnInit {
  // TODO:
  card!: SunCard;
  change = new EventEmitter<SunCardDefinition>();

  values: { name: SunValueNames; meta: SunValuesMeta; active: boolean }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.values = Object.entries(SunValues).map(([name, meta]) => ({
      name: name as SunValueNames,
      meta,
      active: this.card.definition.showValues.indexOf(name as SunValueNames) !== -1,
    }));

    this.sortValues();
  }

  sortValues() {
    this.values.sort((a, b) => {
      const iA = this.card.definition.showValues.indexOf(a.name);
      const iB = this.card.definition.showValues.indexOf(b.name);
      if (iA === -1 && iB !== -1) return 1;
      if (iB === -1 && iA !== -1) return -1;
      if (iB === -1 && iA === -1) return a.meta.title.cs.localeCompare(b.meta.title.cs);
      return iA - iB || a.meta.title.cs.localeCompare(b.meta.title.cs);
    });
  }

  private saveValues() {
    const showValues = this.values.filter((item) => item.active).map((item) => item.name);
    this.change.emit({
      ...this.card.definition,
      showValues,
    });
  }

  onCheck() {
    this.saveValues();
    this.sortValues();
  }

  onReorder(event: any) {
    this.values.splice(event.detail.to, 0, ...this.values.splice(event.detail.from, 1));

    this.saveValues();
    this.sortValues();

    event.detail.complete();
  }
}
