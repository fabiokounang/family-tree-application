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
  loader: boolean = false;

  constructor (private router: Router, private apiService: ApiService, private sharedService: SharedService, private meta: Meta) { }

  ngOnInit() {
    this.url = this.meta.getTag('name=api').content + 'images/';
  }

  ionViewWillEnter () {
    this.getUser();
  }

  getUser () {
    this.loader = true;
    this.apiService.connection('master-self-user').subscribe({
      next: (response: UserInterface) => {
        this.user = response;
        this.loader = false;
      },
      error: ({ error }: HttpErrorResponse) => {
        this.sharedService.callAlert('Something went wrong', 'Please try again');
        this.loader = false;
      },
      complete: () => {}
    });
  }

  onLogout () {
    this.router.navigate(['/']);
    this.sharedService.removeLocalStorage();
  }

  onUpload (file: any) {
    const maxSize = 2 * 1024 * 1024;
    const photo: File = file.target.files[0];

    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(photo.type)) {
      this.sharedService.callAlert('File must be image format', 'PNG / JPEG / JPG');
      return;
    }
    if (photo.size > maxSize) {
      this.sharedService.callAlert('File size is too large', 'Please pick another smaller file');
      return;
    }

    const formData = new FormData();
    formData.append("image", photo, photo.name);

    this.apiService.connection('master-user-upload', formData).subscribe({
      next: (response: any) => {
        this.getUser();
        this.sharedService.callToast('Success upload image', 'bottom');
      },
      error: ({ error }: HttpErrorResponse) => {
        this.sharedService.callAlert(!error.error ? error : error.error);
      },
      complete: () => {}
    });
  }

}
