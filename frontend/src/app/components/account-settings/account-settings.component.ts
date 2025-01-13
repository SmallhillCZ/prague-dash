import { Component } from "@angular/core";
import { SyncService } from "src/app/services/sync.service";

@Component({
  selector: "pd-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrl: "./account-settings.component.scss",
  standalone: false,
})
export class AccountSettingsComponent {
  constructor(public readonly syncService: SyncService) {}
}
