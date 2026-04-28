import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { UntilDestroy } from "@ngneat/until-destroy";
import { AccountSettingsComponent } from "src/app/components/account-settings/account-settings.component";
import { DashEditComponent } from "src/app/components/dash-edit/dash-edit.component";
import { GlobalSettingsComponent } from "src/app/components/global-settings/global-settings.component";

@UntilDestroy()
@Component({
  selector: "pd-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  imports: [IonicModule, DashEditComponent, AccountSettingsComponent, GlobalSettingsComponent],
})
export class SettingsComponent {}
