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
  changePasswordForm: FormGroup = new FormGroup({
    old_password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
    new_password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
    confirmation_password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  });

  constructor (private apiService: ApiService, private sharedService: SharedService) {}

  ngOnInit () {
  }

  onChangePassword () {
    if (this.changePasswordForm.valid) {
      this.apiService.connection('master-change-password', this.changePasswordForm.value).subscribe({
        next: (response: any) => {
          this.changePasswordForm.reset();
          this.sharedService.callToast('Success change password', 'bottom');
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
