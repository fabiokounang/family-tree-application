import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';
import { IonSlides, Platform, ViewWillEnter } from '@ionic/angular';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { BannerInterface } from 'src/app/interfaces/banner.interface';
import { BannerPaginationInterface } from 'src/app/interfaces/bannerpagination.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit, ViewWillEnter {
  @ViewChild('slide', { read: IonSlides }) slide: IonSlides;
  selectedDate: any = null;
  selectedCalendar: any = null;
  month = new Date().getMonth() + 1;
  objectKeys = Object.keys;
  calendar: any = null;
  user: any = null;
  themes: any[] = [];
  theme: any = null;
  loader: boolean = false;
  color: string = '#FFFFFF';
  text: string = '#FFFFFF';
  emptyDay: any = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  nowMonth = new Date().getMonth() + 1;
  today = new Date().getDate();
  isModalOpen: boolean = false;
  detailDataCalendar: any = [];
  token: string = '';
  ionApp: HTMLElement = document.querySelector('ion-app');
  body: HTMLElement = document.querySelector('body');
  date = new Date;
  bullet: number = 0;
  fullname: string = '';
  no_anggota: string = '';
  showMore: boolean = false;
  slides: any = null;

  slideOpts = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

           let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

           let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

           // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

           const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

           $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }

         // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }

  newsletter: any[] = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit! Lorem ipsum dolor sit amet 1',
      image: '',
      subtitle: 'Lorem ipsum dolor sit amet elit. Velit, odit!',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus eligendi vel provident labore nobis nemo repellat sapiente consectetur facere, ea, quos qui aliquid laboriosam! Doloremque esse nobis sunt laborum quia tempore voluptate beatae quaerat nihil maxime, adipisci minima quis voluptatem aperiam, excepturi minus eligendi nulla illum ipsum! Fuga, inventore similique.'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit! Lorem ipsum dolor sit amet 2',
      image: '',
      subtitle: 'Lorem ipsum dolor sit amet elit. Velit, odit!',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus eligendi vel provident labore nobis nemo repellat sapiente consectetur facere, ea, quos qui aliquid laboriosam! Doloremque esse nobis sunt laborum quia tempore voluptate beatae quaerat nihil maxime, adipisci minima quis voluptatem aperiam, excepturi minus eligendi nulla illum ipsum! Fuga, inventore similique.'
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit! Lorem ipsum dolor sit amet 3',
      image: '',
      subtitle: 'Lorem ipsum dolor sit amet elit. Velit, odit!',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus eligendi vel provident labore nobis nemo repellat sapiente consectetur facere, ea, quos qui aliquid laboriosam! Doloremque esse nobis sunt laborum quia tempore voluptate beatae quaerat nihil maxime, adipisci minima quis voluptatem aperiam, excepturi minus eligendi nulla illum ipsum! Fuga, inventore similique.'
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit! Lorem ipsum dolor sit amet 4',
      image: '',
      subtitle: 'Lorem ipsum dolor sit amet elit. Velit, odit!',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus eligendi vel provident labore nobis nemo repellat sapiente consectetur facere, ea, quos qui aliquid laboriosam! Doloremque esse nobis sunt laborum quia tempore voluptate beatae quaerat nihil maxime, adipisci minima quis voluptatem aperiam, excepturi minus eligendi nulla illum ipsum! Fuga, inventore similique.'
    }
  ]

  constructor (private apiService: ApiService, private sharedService: SharedService, private meta: Meta, private router: Router, private platform: Platform) { }

  ngOnInit(): void {
    if (!this.platform.platforms().includes('desktop') && !this.platform.is('mobileweb')) this.requestNotification();
    this.listenSubscription();
  }

  fillData () {
    this.fullname = this.sharedService.getLocalStorage().fullname;
    this.no_anggota = this.sharedService.getLocalStorage().no_anggota;
  }

  listenSubscription () {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.removeUtil();
    });
  }

  ionViewWillEnter () {
    this.fillData();
    this.getUser();
    this.getCalendar();
    this.getBanner();
    this.getBulletin();
  }

  async refreshPage (event) {
    setTimeout(() => {
      this.getUser();
      this.getCalendar();
      this.getBanner();
      this.getBulletin();
      event.target.complete();
    }, 2000);
  }


  onSlide (event) {
    this.slide.getActiveIndex().then((index) => {
      this.bullet = index;
    }).catch(err => console.log(err))
  }

  getUser () {
    this.apiService.connection('master-self-user').subscribe({
      next: (response: UserInterface) => {
        this.user = response;
      },
      error: ({ error }: HttpErrorResponse) => {
        this.sharedService.callAlert(!error.error ? error : error.error);
      },
      complete: () => {}
    });
  }

  getBanner () {
    this.apiService.connection('master-banner').subscribe({
      next: (response: any) => {
        this.slides = response.values;
      },
      error: ({ error }: HttpErrorResponse) => {
        this.sharedService.callAlert(!error.error ? error : error.error);
      },
      complete: () => {}
    });
  }

  getBulletin () {
    this.apiService.connection('master-bulletin', { page: 0, limit: 3 }).subscribe({
      next: (response: any) => {
        this.newsletter = response.values;
        if (response.total > 3) this.showMore = true;
      },
      error: ({ error }: HttpErrorResponse) => {
        this.sharedService.callAlert(!error.error ? error : error.error);
      },
      complete: () => {}
    });
  }

  onInformation () {
    this.sharedService.callAlert('Point Information', 'You can redeem point and use it to get prizes', '', ['Dismiss']);
  }

  getCalendar () {
    this.apiService.connection('master-calendar-active').subscribe({
      next: (response: any) => {
        this.calendar = response.value;
        this.processEmptyDay();
      },
      error: ({ error }: HttpErrorResponse) => {
        this.loader = false;
        this.sharedService.callAlert(!error.error ? error : error.error);
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

  processEmptyDay () {
    const year = new Date().getFullYear();
    const d = `${this.months[this.month - 1]} 1, ${year} 00:00:01`;
    const day = new Date(d).getDay();
    this.emptyDay = Array.from(Array(day).keys());
  }

  onDetailEvent (event) {
    this.sharedService.callAlert(event.name, event.description);
  }

  onCalendarEvents (events) {
    this.isModalOpen = !this.isModalOpen;
  }

  setOpen (bool, data = null) {
    if (bool && data.length <= 0) {
      this.sharedService.callToast('No event on this data', 'bottom', 1000);
      return;
    }

    this.isModalOpen = bool;
    if (this.isModalOpen) this.detailDataCalendar = data;
    else this.detailDataCalendar = null;
  }

  async onPermissionCamera () {
    const status = await BarcodeScanner.checkPermission({ force: true });
    return status;
  }

  async onOpenCamera () {
    try {
      if (await this.onPermissionCamera()) {
        this.addUtil();
        const result = await BarcodeScanner.startScan();
        if (result && result.hasContent) {
          this.router.navigate(['/event', result.content]);
          this.removeUtil();
        } else {
          this.removeUtil();
        }
      }
    } catch (error) {
      this.removeUtil();
    }
  }

  addUtil () {
    BarcodeScanner.hideBackground();
    this.ionApp.classList.add('scanner-ui');
    this.body.classList.add('scanner-active');
  }

  removeUtil () {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.ionApp.classList.remove('scanner-ui');
    this.body.classList.remove('scanner-active');
  }

  changeMonth (num: number) {
    if (this.month + num > 0 && this.month + num <= 12) this.month = this.month + num;
    this.nowMonth = this.month;
    this.processEmptyDay();
  }

  requestNotification () {
    console.log('Mobile application starting...');
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      this.token = token.value;
      this.updateUserToken();
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        this.sharedService.callToast(notification.body, 'top', 3000, notification.title);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }

  updateUserToken () {
    this.apiService.connection('master-user-tokenfcm', { token: this.token }).subscribe({
      next: (response: any) => {
        console.log(response, 'response update user token')
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error, 'error update user token');
      }
    })
  }
}
