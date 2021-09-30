import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SettingsService } from 'src/app/core/services/settings.service';
import { AppSettings } from 'src/app/schema/app-settings';
import packageJSON from "../../../../package.json";

@UntilDestroy()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {

  settings: AppSettings = {
    language: "cs"
  };

  appVersion = packageJSON.version;

  @ViewChild("form") form!: NgForm;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngAfterViewInit(): void {
    this.form.valueChanges
      ?.pipe(untilDestroyed(this))
      .subscribe(data => this.settingsService.saveSettings(data));
  }

}
