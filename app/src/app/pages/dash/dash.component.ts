import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';

@UntilDestroy()
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  // pages: { cards: Card[]; }[] = [];
  cards: Card[] = [];

  constructor(
    private dashboardService: DashboardService,
    @Inject(CARDS) private cardTypes: CardType[],
    private navController: NavController
  ) { }

  ngOnInit(): void {
    this.dashboardService.dashboard
      .pipe(untilDestroyed(this))
      .subscribe(dashboard => this.cards = dashboard?.cards || []);
  }



  doRefresh(event: any) {

    this.cards = JSON.parse(JSON.stringify(this.cards));

    setTimeout(() => {
      event.target?.complete();
    }, 500);
  }

  openDetail(card: Card) {
    const type = this.cardTypes.find(item => item.type === card.type);

    if (!type) return;

    if (type.detailComponent) {
      this.navController.navigateForward('/card/' + card.id);
    }
    else if (type.settingsComponent) {
      this.navController.navigateForward('/card/' + card.id + '/settings');
    }
  }

}
