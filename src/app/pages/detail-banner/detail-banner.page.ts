import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides, ViewWillEnter } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.services';


@Component({
  selector: 'app-detail-banner',
  templateUrl: './detail-banner.page.html',
  styleUrls: ['./detail-banner.page.scss'],
})
export class DetailBannerPage implements ViewWillEnter {

  @ViewChild('slide', { read: IonSlides }) slide: IonSlides;
  banner: any[] = [];

  slideOpts = {
    slidesPerView: 2,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
    }
  }

  bullet: number = 0;
  detail: any = null;
  id: string = '';

  constructor (private apiService: ApiService, private sharedService: SharedService, private route: ActivatedRoute) { }

  ionViewWillEnter () {
    this.id = this.route.snapshot.params['id'];
    this.getBulletin();
  }

  getBulletin () {
    this.apiService.connection('master-one-banner', {}, '', this.id).subscribe({
      next: (response: any) => {
        this.detail = response;
      },
      error: ({ error }: HttpErrorResponse) => {
        this.sharedService.callAlert(!error.error ? error : error.error);
      },
      complete: () => {}
    });
  }

  onSlide (event) {
    this.slide.getActiveIndex().then((index) => {
      this.bullet = index;
    }).catch(err => console.log(err))
  }

  onOtherNewsLetter (detail) {
    this.detail = detail;
  }
}
