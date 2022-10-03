import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

  constructor (private apiService: ApiService, private sharedService: SharedService, private meta: Meta) { }

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

  async onOpenCamera () {
    console.log('Opening the camera');
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    console.log(imageUrl);

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
