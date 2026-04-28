import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SyncService } from "src/app/services/sync.service";

@Component({
  selector: "pd-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrl: "./account-settings.component.scss",
  imports: [CommonModule, IonicModule],
})
export class AccountSettingsComponent {
  constructor(public readonly syncService: SyncService) {}
}
