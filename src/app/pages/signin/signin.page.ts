import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signinForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  });
  constructor (private apiService: ApiService, private router: Router) { }

  ngOnInit() {

  }

  onSignin () {
    if (this.signinForm.valid) {
      this.apiService.connection('master-signin', this.signinForm.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['/home', 'homepage']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => {}
      });
    } else {

    }
  }

}
