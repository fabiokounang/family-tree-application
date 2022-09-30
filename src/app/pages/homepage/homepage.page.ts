import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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

  constructor (private apiService: ApiService) { }

  ngOnInit(): void {
    // this.user = {
    //   username: this.apiService.getLocalStorageUsername(),
    //   latin_name: this.apiService.getLocalStorageLatin(),
    //   chinese_name: this.apiService.getLocalStorageChinese(),
    //   no_anggota: this.apiService.getLocalStorageNoAnggota()
    // }

    this.getCalendar();
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
        this.apiService.processErrorHttp(!error.error ? error : error.error);
      },
      complete: () => {
        this.loader = false;
      }
    });
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
