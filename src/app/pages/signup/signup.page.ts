import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@capacitor/core';
import { map } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.services';

import { ProvincePaginationInterface } from '../../interfaces/provincepagination.interface';
import { DropdownInterface } from '../../interfaces/dropdown.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('inputPassword') inputPassword: ElementRef<any>;
  loader: boolean = false;
  signupForm: FormGroup;
  provinces: DropdownInterface[] = [];
  cities: any[] = [];
  selectedCities: any[] = [];
  eyePassword: string = 'eye-outline';
  eyeConfirmationPassword: string = 'eye-outline';
  typePassword: string = 'password';
  typeConfirmationPassword: string = 'password';
  radioSelected: number = 1;
  constructor (private apiService: ApiService, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.makeForm();
    this.getAllProvince();
    this.getAllCity();
  }

  makeForm () {
    this.signupForm = new FormGroup({
      fullname: new FormControl(null, [Validators.required]),
      nik: new FormControl(null, [Validators.minLength(16), Validators.maxLength(16)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16), this.checkPassword.bind(this)]),
      confirmation_password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16), this.checkConfirmationPassword.bind(this)]),
      gender: new FormControl(null, [Validators.required]),
      // first_name_latin: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      // last_name_latin: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      // chinese_name: new FormControl(null, [Validators.maxLength(200)]),
      // life_status: new FormControl(1, [Validators.required]),
      // address: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
      // date_of_birth: new FormControl(null, [Validators.required]),
      place_of_birth: new FormControl(null, [Validators.required]),
      city_of_residence: new FormControl({ value: null, disabled: true }, [Validators.required]),
      // phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(14)]),
      // wechat: new FormControl(null, [Validators.minLength(10), Validators.maxLength(14)]),
      // postal_address: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
      // remark: new FormControl(null)
    });
  }

  checkPassword (control: FormControl) {
    if (this.signupForm) {
      if (control.value == this.signupForm.value.confirmation_password) {
        this.signupForm.get('confirmation_password')?.setErrors(null);
        this.signupForm.get('password')?.setErrors(null);
      }
    }
  }

  checkConfirmationPassword (control: FormControl) {
    if (this.signupForm) {
      if (control.value != this.signupForm.value.password) {
        return {
          mismatch: 'Konfirmasi password tidak sesuai dengan password'
        }
      } else {
        this.signupForm.get('password')?.setErrors(null);
        return null;
      }
    }
  }

  onRadioSelected (event) {
    this.radioSelected = event.target.value;
  }

  getAllProvince () {
    this.apiService.connection('master-province').pipe(map((provinces: ProvincePaginationInterface) => {
      return this.helperMap(provinces.values, 'province');
    })).subscribe({
      next: (response: DropdownInterface[]) => {
        this.provinces = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

  getAllCity () {
    this.apiService.connection('master-city').pipe(map((cities: any) => {
      return cities.values.map((d) => {
        return {
          id: d._id,
          name: d.city,
          provinceId: d.provinceId
        }
      });
    })).subscribe({
      next: (response: any) => {
        this.cities = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

  helperMap (data, key) {
    return data.map((d) => {
      return {
        id: d._id,
        name: d[key]
      }
    });
  }

  onSelectProvince (event: any) {
    const provinceId = event.detail.value;
    this.selectedCities = this.cities.filter(val => val.provinceId == provinceId);
    this.signupForm.get('city_of_residence').enable();
  }

  onSignup () {
    if (this.signupForm.valid) {
      this.loader = true;
      this.signupForm.disable();
      this.apiService.connection('master-signup', this.signupForm.value).subscribe({
        next: (response: HttpResponse) => {
          this.sharedService.callToast('Berhasil daftar', 'bottom');
          this.signupForm.enable();
          this.router.navigate(['/signin']);
        },
        error: ({ error }: HttpErrorResponse) => {
          this.sharedService.callAlert(!error.error ? error : error.error);
          this.signupForm.enable();
          this.loader = false;
        },
        complete: () => {
          this.signupForm.enable();
          this.loader = false;
        }
      });
    } else {
      this.sharedService.callAlert('Bad request', 'Input not valid');
    }
  }

  onEye (varEye, varType) {
    this[varEye] = this[varEye] === 'eye-outline' ? 'eye-off-outline' : 'eye-outline';
    this[varType] = this[varEye] === 'eye-outline' ? 'password' : 'text';
  }

}
