import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.services';


@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.page.html',
  styleUrls: ['./register-event.page.scss'],
})
export class RegisterEventPage implements OnInit {

  loader: boolean = false;
  registerEventForm: FormGroup;

  constructor (private apiService: ApiService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm () {
    this.registerEventForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
    });
  }

  onSignin () {
    if (this.registerEventForm.valid) {
      this.registerEventForm.disable();
      this.loader = true;
      this.apiService.connection('master-register-event', this.registerEventForm.value, '', this.route.snapshot.params['id']).subscribe({
        next: (response: UserInterface) => {
          this.sharedService.callAlert('Congratulations', 'You succeeded redeem point');
          this.router.navigate(['/home', 'homepage']);
        },
        error: (error : HttpErrorResponse) => {
          this.sharedService.callAlert(!error.error ? error : error.error);
          this.registerEventForm.enable();
          this.loader = false;
        },
        complete: () => {
          this.registerEventForm.enable();
          this.loader = false;
        }
      });
    } else {
      this.sharedService.callAlert('Bad request', 'Input not valid');
    }
  }

}
