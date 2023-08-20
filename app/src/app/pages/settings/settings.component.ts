import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AppSettings } from "src/app/schema/app-settings";
import { SettingsService } from "src/app/services/settings.service";
import packageJson from "../../../../package.json";

@UntilDestroy()
@Component({
  selector: "pd-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  settings?: AppSettings;

  appVersion?: string;

  @ViewChild("form") form!: NgForm;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.loadVersion();
  }

  ngAfterViewInit(): void {
    this.loadSettings();

    this.form.valueChanges?.pipe(untilDestroyed(this)).subscribe((data) => this.settingsService.saveSettings(data));
  }

  async loadSettings() {
    this.settings = await this.settingsService.getSettings();
  }

  loadVersion() {
    this.appVersion = packageJson.version;
  }
}
