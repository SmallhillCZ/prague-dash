import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AlertController, NavController, Platform, ViewDidEnter, ViewWillLeave } from "@ionic/angular";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, Subscription, combineLatest } from "rxjs";
import { filter } from "rxjs/operators";
import { CardType } from "src/app/schema/card-type";
import { CARDS } from "src/app/schema/cards-token";
import { Dashboard, DashboardPage } from "src/app/schema/dashboard";
import { DashboardService } from "src/app/services/dashboard.service";
import { SwiperContainer } from "swiper/element";
import { Swiper, SwiperOptions } from "swiper/types";

@UntilDestroy()
@Component({
  selector: "pd-dash",
  templateUrl: "./dash.component.html",
  styleUrls: ["./dash.component.scss"],
  standalone: false,
})
export class DashComponent implements OnInit, AfterViewInit, ViewDidEnter, ViewWillLeave {
  dashboard?: Dashboard;

  currentPage?: DashboardPage;

  swiper = new BehaviorSubject<Swiper | undefined>(undefined);

  swiperConfig: SwiperOptions = {
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: false,
  };

  enableRefresh = true;

  backButtonSubscription?: Subscription;

  @ViewChild("swiper") private swiperEl?: ElementRef<SwiperContainer>;

  constructor(
    private dashboardService: DashboardService,
    @Inject(CARDS) private cardTypes: CardType[],
    private navController: NavController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    const dash = this.dashboardService.dashboard.pipe(untilDestroyed(this));

    dash.subscribe((dash) => (this.dashboard = dash));

    const params = this.route.queryParams.pipe(untilDestroyed(this));

    combineLatest([dash, params, this.swiper])
      .pipe(filter((dash, swiper) => !!dash && !!dash))
      .subscribe(([dash, params]) => {
        this.updateState();
      });

    combineLatest([dash, params, this.swiper])
      .pipe(filter((item): item is [Dashboard, Params, Swiper] => !!item[0] && !!item[2]))
      .subscribe(([dash, params]) => {
        const pageId = params["page"] || dash.pages[0]?.id;
        if (pageId !== this.currentPage?.id) {
          this.openPage(pageId, true);
        }
      });
  }

  ngAfterViewInit(): void {
    console.log(this.swiperEl);
    if (this.swiperEl?.nativeElement) {
      console.log(this.swiperEl);
      this.initializeSwiper(this.swiperEl.nativeElement);
    }
  }

  private async initializeSwiper(swiperEl: SwiperContainer) {
    swiperEl.initialize();

    this.updateState();

    this.swiper.next(swiperEl.swiper);
  }

  ionViewDidEnter(): void {
    // Quit on back button when on dash and not first page
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(-1, async () => {
      if (this.route.snapshot.params["page"]) {
        this.navController.navigateRoot("/");
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
    const index = this.dashboard.pages.findIndex((item) => item.id === pageId);

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

  async addPage() {
    const alert = await this.alertController.create({
      header: "Nová stránka",
      message: "Vytvoří novou stránku pro vaše karty.",
      inputs: [
        {
          name: "title",
          type: "text",
          placeholder: "Název stránky",
        },
      ],
      buttons: [
        {
          text: "Zrušit",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Vytvořit",
          handler: (data: { title: string }) => {
            if (!data.title) return false;
            this.addPageConfirmed(data);
            return true;
          },
        },
      ],
    });

    await alert.present();
  }

  private async addPageConfirmed(data: { title: string }) {
    const title = data.title || undefined;
    const page = await this.dashboardService.createPage(title);
    setTimeout(() => this.openPage(page.id), 500); // wait for DOM update (could be better...)
  }
}
