import { Injectable } from "@angular/core";
import { HttpRequest, HttpClient } from '@angular/common/http';
import HttpList from '../utils/http-endpoint';
import { Meta } from '@angular/platform-browser';
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private apiHttp: string = '';
  private subHttp: any = HttpList;

  errGeneral: string = 'Something went wrong, please try again';

  constructor (private toastController: ToastController) {}

  async callToast (message: string, position: 'top' | 'middle' | 'bottom', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position
    });
    await toast.present();
  }
}
