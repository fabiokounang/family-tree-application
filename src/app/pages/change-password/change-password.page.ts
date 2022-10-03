import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  loader: boolean = false;
  changePasswordForm: FormGroup;

  constructor (private apiService: ApiService, private sharedService: SharedService) {}

  ngOnInit () {
    this.makeForm();
  }

  makeForm () {
    this.changePasswordForm = new FormGroup({
      old_password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      new_password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      confirmation_password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
    });
  }

  onChangePassword () {
    if (this.changePasswordForm.valid) {
      this.loader = true;
      this.apiService.connection('master-change-password', this.changePasswordForm.value).subscribe({
        next: (response: any) => {
          this.loader = false;
          this.changePasswordForm.reset();
          this.sharedService.callToast('Success change password', 'bottom');
        },
        error: (error: HttpErrorResponse) => {
          this.loader = false;
          console.log(error);
        },
        complete: () => {}
      });
    } else {

    }
  }

}
