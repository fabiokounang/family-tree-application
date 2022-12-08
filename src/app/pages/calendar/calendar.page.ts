import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ModalOptions, ViewWillEnter } from '@ionic/angular';
import { EventDetailPage } from 'src/app/components/event-detail/event-detail.page';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements ViewWillEnter {
  @ViewChild('modal') modal: ModalOptions;
  type: any;
  calendar: any = null;
  selectedDate: any = null;
  selectedCalendar: any = null;
  nowMonth = new Date().getMonth() + 1;
  month = new Date().getMonth() + 1;
  nowDay = new Date().getDate();
  objectKeys = Object.keys;
  user: any = null;
  themes: any[] = [];
  theme: any = null;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  loader: boolean = false;
  emptyDay: any = [];
  today = new Date().getDate();
  isModalOpen: boolean = false;
  detailDataCalendar: any = [];
  splitSecond: boolean = false;
  selectedDayData: any = null;

  constructor (private apiService: ApiService, private sharedService: SharedService, private modalController: ModalController) { }

  ngOnInit() {}

  ionViewWillEnter () {
    this.getCalendar();
  }

  onToggle (event) {
    this.type = event.detail.checked;
  }

  getCalendar () {
    this.apiService.connection('master-calendar-active').subscribe({
      next: (response: any) => {
        this.calendar = response.value;
        console.log(this.calendar)
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

  async onOpenFormEvent (calendar, month, day) {
    if (calendar.calendar[month][day] && calendar.calendar[month][day].events.length > 0) {
      this.selectedDayData = {
        events: calendar.calendar[month][day].events,
        month: month,
        day: day
      }
    } else {
      this.selectedDayData = null;
    }
  }

  changeMonth (num: number) {
    if (this.month + num > 0 && this.month + num <= 12) this.month = this.month + num;
    this.processEmptyDay();
    this.splitSecond = true;
    setTimeout(() => this.splitSecond = false);
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

}
