import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AppSettings } from "src/app/schema/app-settings";
import { SettingsService } from "src/app/services/settings.service";
import packageJson from "../../../../package.json";

@UntilDestroy()
@Component({
  selector: "pd-global-settings",
  templateUrl: "./global-settings.component.html",
  styleUrl: "./global-settings.component.scss",
  imports: [CommonModule, FormsModule, IonicModule],
})
export class GlobalSettingsComponent {
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
