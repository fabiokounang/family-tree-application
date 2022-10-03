import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  loader: boolean = false;
  signinForm: FormGroup;

  constructor (private apiService: ApiService, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm () {
    this.signinForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
    });
  }

  onSignin () {
    if (this.signinForm.valid) {
      this.signinForm.disable();
      this.loader = true;
      this.apiService.connection('master-signin', this.signinForm.value).subscribe({
        next: (response: UserInterface) => {
          this.sharedService.saveToLocalStorage(response);
          this.router.navigate(['/home', 'homepage']);
        },
        error: (error : HttpErrorResponse) => {
          this.sharedService.callAlert(!error.error ? error : error.error);
          this.signinForm.enable();
          this.loader = false;
        },
        complete: () => {
          this.signinForm.enable();
          this.loader = false;
        }
      });
    } else {
      this.sharedService.callAlert('Bad request', 'Input not valid');
    }
  }

}
