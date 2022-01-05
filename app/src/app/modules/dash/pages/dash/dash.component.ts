import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, NavController, Platform, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';
import { Dashboard, DashboardPage } from 'src/app/schema/dashboard';
import SwiperCore, { Parallax, Swiper, SwiperOptions } from 'swiper';

SwiperCore.use([Parallax]);

interface Page {
  page: DashboardPage;
  cards: Card[];
}

@UntilDestroy()
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements ViewDidEnter, ViewDidLeave {

  dashboard?: Dashboard;

  currentPage?: DashboardPage;

  swiper?: Swiper;

  swiperConfig: SwiperOptions = {
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: false
  };

  backButtonSubscription?: Subscription;

  constructor(
    private dashboardService: DashboardService,
    @Inject(CARDS) private cardTypes: CardType[],
    private navController: NavController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private platform: Platform
  ) { }

  ionViewDidEnter(): void {

    // Quit on back button when on dash and not first page
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(-1, async () => {
      if (this.route.snapshot.params["page"]) {
        this.navController.navigateRoot("/");
      }
      else {
        App.exitApp();
      }
    });

    const dash = this.dashboardService.dashboard.pipe(untilDestroyed(this));
    const params = this.route.params.pipe(untilDestroyed(this));

    dash.subscribe(dash => this.dashboard = dash);

    combineLatest([dash, params])
      .subscribe(([dash, params]) => {
        if (!dash || !params["page"]) return;
        const i = params["page"] ? dash.pages.findIndex(item => item.id === params["page"]) : 0;
        this.currentPage = i ? dash.pages[i] : undefined;
        window.setTimeout(() => this.swiper?.slideTo(i || 0), 500);
      });
  }

  ionViewDidLeave(): void {
    this.backButtonSubscription?.unsubscribe();
  }

  onSwiper(swiper: Swiper) {
    this.swiper = swiper;
  }
  onSlideChange(swiper: Swiper) {
    this.currentPage = this.dashboard!.pages[swiper.activeIndex];
  }

  doRefresh(event: any, page: DashboardPage) {

    page.cards = JSON.parse(JSON.stringify(page.cards));

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
    else {
      this.navController.navigateForward('/card/' + card.id + '/settings');
    }
  }

  async addPage() {
    const alert = await this.alertController.create({
      header: 'Nová stránka',
      message: 'Vytvoří novou stránku pro vaše karty napravo od stávajících. Pro její zobrazení přejeďte prstem zprava doleva.',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Název stránky'
        },
      ],
      buttons: [
        {
          text: 'Zrušit',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Vytvořit',
          handler: (data: { title: string; }) => this.addPageConfirmed(data)
        }
      ]
    });

    await alert.present();
  }

  private async addPageConfirmed(data: { title: string; }) {
    const title = data.title || undefined;
    return this.dashboardService.createPage(title);
  }



};
