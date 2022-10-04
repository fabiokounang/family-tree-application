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
        console.log(this.calendar.calendar[this.month][this.today]);
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
  //   console.log(status, 'status')
  //   // return status.granted;
  //   //   const permission = await Camera.checkPermissions();
  // //   if (permission.camera != 'granted') {
  // //     let dataPermission = await Camera.requestPermissions();
  // //     if (dataPermission.camera === 'granted') this.onOpenCamera();
  // //   } else {
  // //     this.onOpenCamera();
  // //   }
    return status;
  }

  async onOpenCamera () {
    try {
      console.log(document.querySelector('.ionapp'));
      const status = await this.onPermissionCamera();
      if (status) {
        this.sharedService.onCamera.next(true);
        BarcodeScanner.hideBackground();
        // html, body background: transparent
        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
        // if the result has content
        if (result.hasContent) {
          this.router.navigate(['/event', result.content]);
          this.sharedService.onCamera.next(false);
        }
        // const image = await Camera.getPhoto({
        //   quality: 90,
        //   allowEditing: true,
        //   resultType: CameraResultType.Uri,
        //   source: CameraSource.Camera
        // });
        // console.log('base64String' + image.base64String)
        // console.log('dataUrl' + image.dataUrl);
        // console.log('exif' + image.exif)
        // console.log('format' + image.format)
        // console.log('path' + image.path)
        // console.log('saved' + image.saved)
        // console.log('webPath' + image.webPath)
      }
    } catch (error) {
      console.log(error, 'error');
    }


  }

  onOpenFormEvent (calendar, month, day) {
    // if (calendar.calendar[month][day] && calendar.calendar[month][day].length > 0) {
    //   this.dialog.open(CalendarEventComponent, {
    //     width: '900px',
    //     data: calendar.calendar[month][day]
    //   })
    // } else {
    //   this.apiService.callSnack('No event', 'Dismiss');
    // }
  }

  changeMonth (num: number) {
    if (this.month + num > 0 && this.month + num <= 12) this.month = this.month + num;
  }


}
