import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, NavController, Platform, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
export class DashComponent implements OnInit, ViewDidEnter, ViewWillLeave {

  dashboard?: Dashboard;

  currentPage?: DashboardPage;

  swiper?: Swiper;

  swiperConfig: SwiperOptions = {
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: false
  };

  enableRefresh = false;

  backButtonSubscription?: Subscription;

  constructor(
    private dashboardService: DashboardService,
    @Inject(CARDS) private cardTypes: CardType[],
    private navController: NavController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {

    const dash = this.dashboardService.dashboard.pipe(untilDestroyed(this));

    dash.subscribe(dash => this.dashboard = dash);

    const params = this.route.queryParams.pipe(untilDestroyed(this));

    combineLatest([dash, params])
      .pipe(filter((item): item is [Dashboard, Params] => !!item[0]))
      .subscribe(([dash, params]) => {

        const pageId = params["page"] || dash.pages[0]?.id;
        if (pageId !== this.currentPage?.id) {
          this.updatePage(pageId);
        }
      });

  }

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

  }

  ionViewWillLeave(): void {
    this.backButtonSubscription?.unsubscribe();
  }

  onSwiper(swiper: Swiper) {
    this.swiper = swiper;
    if (this.dashboard && this.currentPage) {
      const i = this.dashboard.pages.findIndex(item => item.id === this.currentPage!.id);
      if (i !== undefined) this.swiper.slideTo(i);
    }
  }

  getCurrentCardsEl() {
    return this.swiper?.slides[this.swiper.activeIndex]?.querySelector(".cards");
  }

  onSlideChange() {
    if (!this.swiper || !this.dashboard) return;
    const pageId = this.dashboard.pages[this.swiper.activeIndex].id;
    this.updatePage(pageId);
  }

  updatePage(pageId: string) {
    if (!this.dashboard) return;

    const newIndex = this.dashboard.pages.findIndex(item => item.id === pageId);
    const newPage = this.dashboard.pages[newIndex];
    if (!newPage) throw new Error("Page doesnt exist: " + pageId);

    this.ngZone.run(() => {

      if (newPage && newPage.id !== this.currentPage?.id) {
        this.currentPage = newPage;
        this.enableRefresh = this.getCurrentCardsEl()?.scrollTop === 0;
      }

      if (this.route.snapshot.params["page"] !== newPage.id) {
        this.router.navigate([], { queryParams: { page: pageId }, replaceUrl: true });
      }

      if (this.swiper && this.swiper.activeIndex !== newIndex) {
        this.swiper.slideTo(newIndex);
      }

    });
  }

  onCardsScroll() {
    this.enableRefresh = this.getCurrentCardsEl()?.scrollTop === 0;
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
    const page = await this.dashboardService.createPage(title);
    setTimeout(() => this.updatePage(page.id), 500);
  }



};
