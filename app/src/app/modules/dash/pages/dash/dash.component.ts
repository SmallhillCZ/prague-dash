import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, NavController, Platform, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Card } from 'src/app/schema/card';
import { CardType } from 'src/app/schema/card-type';
import { CARDS } from 'src/app/schema/cards-token';
import { Dashboard, DashboardPage } from 'src/app/schema/dashboard';
import SwiperCore, { Parallax, Swiper, SwiperOptions } from 'swiper';

SwiperCore.use([Parallax]);

@UntilDestroy()
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, ViewDidEnter, ViewWillLeave {

  dashboard?: Dashboard;

  currentPage?: DashboardPage;

  swiper = new BehaviorSubject<Swiper | undefined>(undefined);

  swiperConfig: SwiperOptions = {
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: false
  };

  enableRefresh = true;

  backButtonSubscription?: Subscription;

  constructor(
    private dashboardService: DashboardService,
    @Inject(CARDS) private cardTypes: CardType[],
    private navController: NavController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {

    const dash = this.dashboardService.dashboard.pipe(untilDestroyed(this));

    dash.subscribe(dash => this.dashboard = dash);

    const params = this.route.queryParams.pipe(untilDestroyed(this));

    const swiper = this.swiper.pipe(filter(swiper => !!swiper));

    combineLatest([dash, params, swiper])
      .pipe(filter((item): item is [Dashboard, Params, Swiper] => !!item[0]))
      .subscribe(([dash, params]) => {
        const pageId = params["page"] || dash.pages[0]?.id;
        if (pageId !== this.currentPage?.id) {
          this.openPage(pageId, true);
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

  getCurrentCardsEl() {
    return this.swiper.value?.slides[this.swiper.value.activeIndex]?.querySelector(".cards");
  }

  openPage(pageId: string, immediate: boolean = false) {
    if (!this.dashboard || !this.swiper.value) return;
    const index = this.dashboard.pages.findIndex(item => item.id === pageId);

    if (this.swiper.value.activeIndex !== index) {
      this.swiper.value.slideTo(index, immediate ? 0 : undefined);
    }
  }

  updateState() {
    if (!this.dashboard || !this.swiper.value) return;
    const index = this.swiper.value.activeIndex;
    const page = this.dashboard.pages[index];

    this.ngZone.run(() => {

      if (page.id !== this.currentPage?.id) {
        this.currentPage = page;
      }

      const cardsEl = this.getCurrentCardsEl();
      if (cardsEl) this.enableRefresh = cardsEl.scrollTop === 0;

      if (this.route.snapshot.params["page"] !== page.id) {
        this.router.navigate([], { queryParams: { page: page.id }, replaceUrl: true });
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
      message: 'Vytvoří novou stránku pro vaše karty.',
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
          handler: (data: { title: string; }) => {
            if (!data.title) return false;
            this.addPageConfirmed(data);
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  private async addPageConfirmed(data: { title: string; }) {
    const title = data.title || undefined;
    const page = await this.dashboardService.createPage(title);
    setTimeout(() => this.openPage(page.id), 500); // wait for DOM update (could be better...)
  }



};
