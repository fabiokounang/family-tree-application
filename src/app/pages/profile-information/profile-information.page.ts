import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { DropdownInterface } from 'src/app/interfaces/dropdown.interface';
import { ProvincePaginationInterface } from 'src/app/interfaces/provincepagination.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.page.html',
  styleUrls: ['./profile-information.page.scss'],
})
export class ProfileInformationPage implements ViewWillEnter {
  user: any;
  url: string = '';
  isEditMode = false;
  formProfile: FormGroup;
  loader: boolean = false;
  provinces: any = [];
  selectedCities: any = null;
  cities: any = [];
  constructor (private apiService: ApiService, private sharedService: SharedService, private navCtrl: NavController) { }

  ionViewWillEnter () {
    this.getUser();
  }

  getUser () {
    this.apiService.connection('master-self-user').subscribe({
      next: (response: UserInterface) => {
        this.user = response;
        this.makeForm();
        this.getAllProvince();
        this.getAllCity();
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

  onUpdateStateEdit () {
    this.isEditMode = !this.isEditMode;
  }

  makeForm () {
    this.formProfile = new FormGroup({
      fullname: new FormControl(this.user.fullname, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      chinese_name: new FormControl(this.user.chinese_name, [Validators.maxLength(200)]),
      place_of_birth: new FormControl(this.user.place_of_birth._id, [Validators.required]),
      nik: new FormControl(this.user.nik, [Validators.minLength(16), Validators.maxLength(16)]),
      city_of_residence: new FormControl({ value: this.user.city_of_residence._id, disabled: false }, [Validators.required]),
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
        this.selectedCities = this.cities.filter(val => val.provinceId == this.user.place_of_birth._id);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {}
    });
  }
  onSelectProvince (event: any) {
    const provinceId = event.detail.value;
    this.selectedCities = this.cities.filter(val => val.provinceId == provinceId);
    this.formProfile.get('city_of_residence').enable();
  }

  onEditProfile () {
    if (this.formProfile.valid) {
      this.loader = true;
      this.formProfile.disable();
      this.apiService.connection('master-user-update', this.formProfile.value, '', this.user._id).subscribe({
        next: (response: any) => {
          this.sharedService.callToast('Berhasil update data', 'bottom');
          this.formProfile.enable();
          this.user.chinese_name = this.formProfile.value.chinese_name;
          this.sharedService.setChineseNameLocalStorage(this.user.chinese_name || '');
          this.isEditMode = false;
          this.sharedService.setFlagUpdateProfile();
        },
        error: ({ error }: HttpErrorResponse) => {
          this.sharedService.callAlert(!error.error ? error : error.error);
          this.formProfile.enable();
          this.loader = false;
        },
        complete: () => {
          this.formProfile.enable();
          this.loader = false;
        }
      });
    } else {
      this.sharedService.callAlert('Bad request', 'Input not valid');
    }
  }
}
