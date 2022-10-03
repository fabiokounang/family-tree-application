import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  url: string = '';
  constructor (private router: Router, private apiService: ApiService, private sharedService: SharedService, private meta: Meta) { }

  ngOnInit() {
    this.url = this.meta.getTag('name=api').content + 'images/';
  }

  ionViewWillEnter () {
    this.getUser();
  }

  getUser () {
    this.apiService.connection('master-self-user').subscribe({
      next: (response: UserInterface) => {
        this.user = response;
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

  onLogout () {
    this.router.navigate(['/']);
    this.sharedService.removeLocalStorage();
  }

  onUpload (file: any) {
    const photo = file.target.files[0];
    const formData = new FormData();
    formData.append("image", photo, photo.name);

    this.apiService.connection('master-user-upload', formData).subscribe({
      next: (response: any) => {
        this.getUser();
        this.sharedService.callToast('Success upload image', 'bottom');
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

}
