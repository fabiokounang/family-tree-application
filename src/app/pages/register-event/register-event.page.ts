import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.services';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.page.html',
  styleUrls: ['./register-event.page.scss'],
})
export class RegisterEventPage implements OnInit {
  isSuccess: boolean = false;
  isFailed: boolean = false;
  loader: boolean = false;
  errorMessage: string = '';
  content: any = null;
  constructor (private apiService: ApiService, private sharedService: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.content = this.route.snapshot.params['id'];
    this.onRegisterEvent();
  }

  onRegisterEvent () {
    this.loader = true;
    this.apiService.connection('master-register-event', {}, '', this.route.snapshot.params['id']).subscribe({
      next: (response: any) => {
        this.sharedService.callAlert('Congratulations', 'You succeeded register on this event');
        this.isSuccess = true;
        this.loader = false;
      },
      error: (error : HttpErrorResponse) => {
        this.sharedService.callAlert(!error.error ? error : error.error);
        this.errorMessage = !error.error ? error : error.error;
        this.loader = false;
        this.isFailed = true;
      },
      complete: () => {
        this.loader = false;
      }
    });
  }
}
