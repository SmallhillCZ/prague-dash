import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { DashboardService } from "src/app/services/dashboard.service";
import { ContainerCard, ContainerCardDefinition } from "../../schema/container-card";

@Component({
    selector: "pd-card-container-settings",
    templateUrl: "./card-container-settings.component.html",
    styleUrls: ["./card-container-settings.component.scss"],
    imports: [CommonModule, FormsModule, IonicModule],
})
export class CardContainerSettingsComponent implements OnInit {
  card?: ContainerCard;

  change = new EventEmitter<ContainerCardDefinition>();

  constructor(private dash: DashboardService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.loadCard(params["id"]));
  }

  private async loadCard(id: string) {
    this.card = await this.dash.getCard(id);
  }

  save() {
    if (!this.card) return;
    this.dash.saveCard(this.card);
  }
}
