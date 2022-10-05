import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
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
  url: string = '';
  nowMonth = new Date().getMonth() + 1;
  today = new Date().getDate();
  isModalOpen: boolean = false;
  detailDataCalendar: any = [];

  constructor (private apiService: ApiService, private sharedService: SharedService, private meta: Meta, private router: Router) { }

  ngOnInit(): void {
    this.url = this.meta.getTag('name=api').content + 'images/';
  }

  ionViewWillEnter () {
    this.getUser();
    this.getCalendar();
  }

  async refreshPage (event) {
    setTimeout(() => {
      this.getUser();
      this.getCalendar();
      event.target.complete();
    }, 2000);
  }

  getUser () {
    this.apiService.connection('master-self-user').subscribe({
      next: (response: UserInterface) => {
        this.user = response;
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error);
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
        const year = new Date().getFullYear();
        const d = `${this.months[this.month - 1]} 1, ${year} 00:00:01`;
        const day = new Date(d).getDay();
        this.emptyDay = Array.from(Array(day).keys());
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
      const status = await this.onPermissionCamera();
      if (status) {
        const ionApp = document.querySelector('ion-app');
        ionApp.classList.add('scanner-ui');
        BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan();
        if (result.hasContent) {
          this.router.navigate(['/event', result.content]);
          ionApp.classList.remove('scanner-ui');
        }
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }

  changeMonth (num: number) {
    if (this.month + num > 0 && this.month + num <= 12) this.month = this.month + num;
  }


}
