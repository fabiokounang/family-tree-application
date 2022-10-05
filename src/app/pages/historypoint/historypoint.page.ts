import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';

@Component({
  selector: 'app-historypoint',
  templateUrl: './historypoint.page.html',
  styleUrls: ['./historypoint.page.scss'],
})
export class HistorypointPage implements OnInit {
  points: any[] = [];
  loader: boolean = false;

  constructor(private apiService: ApiService, private sharedService: SharedService) { }

  ngOnInit() {
    this.getAllHistoryPoint();
  }

  getAllHistoryPoint () {
    this.loader = true;
    this.apiService.connection('master-point-history').subscribe({
      next: (response: any) => {
        this.points = response.values;
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

  async refreshPage (event) {
    setTimeout(() => {
      this.getAllHistoryPoint();
      event.target.complete();
    }, 2000);
  }

}
