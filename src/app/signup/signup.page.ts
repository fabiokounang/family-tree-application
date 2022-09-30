import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@capacitor/core';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs/operators';
import { ProvincePaginationInterface } from '../interfaces/provincepagination.interface';
import { CityInterface } from '../interfaces/city.interface';
import { CityPaginationInterface } from '../interfaces/citypagination.interface';
import { DropdownInterface } from '../interfaces/dropdown.interface';
import { IonSelect } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
    confirmation_password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
    gender: new FormControl(null, [Validators.required]),
    first_name_latin: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    last_name_latin: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    chinese_name: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    life_status: new FormControl(1, [Validators.required]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
    date_of_birth: new FormControl(null, [Validators.required]),
    place_of_birth: new FormControl(null, [Validators.required]),
    city_of_residence: new FormControl({ value: null, disabled: true }, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(14)]),
    wechat: new FormControl(null, [Validators.minLength(10), Validators.maxLength(14)]),
    postal_address: new FormControl(null, [Validators.required, Validators.maxLength(6)])
  });
  provinces: DropdownInterface[] = [];
  cities: any[] = [];
  selectedCities: any[] = [];

  constructor (private apiService: ApiService, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.signupForm.valueChanges.subscribe(() => {
      console.log(this.signupForm.controls);
    })
    this.getAllProvince();
    this.getAllCity();
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
      this.apiService.connection('master-signup', this.signupForm.value).subscribe({
        next: (response: HttpResponse) => {
          this.sharedService.callToast('Success signup', 'bottom');
          this.router.navigate(['/signin']);
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
