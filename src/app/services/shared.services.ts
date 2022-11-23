import { Injectable } from "@angular/core";
import HttpList from '../utils/http-endpoint';
import { AlertController, ToastController } from "@ionic/angular";
import { UserInterface } from "../interfaces/user.interface";
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class SharedService {
  onChangeMonth: Subject<any> = new Subject();
  errGeneral: string = 'Kesalahan sistem, silahkan coba lagi';
  sessionOver: string = 'Sesi anda telah habis, silahkan masuk kembali';
  connectionError: string = 'Koneksi internet terputus, Silahkan cek kembali jaringan anda';
  subConnectionError: string = 'Silahkan cek kembali jaringan anda';
  constructor (private toastController: ToastController, private alertController: AlertController) {}

  saveToLocalStorage (user: UserInterface) {
    localStorage.setItem('_id', user._id);
    localStorage.setItem('token', user.token);
    localStorage.setItem('fullname', user.fullname);
    localStorage.setItem('email', user.email);
    localStorage.setItem('status', user.status);
    localStorage.setItem('no_anggota', user.no_anggota);
    localStorage.setItem('chinese_name', user.chinese_name);
    // localStorage.setItem('last_name_latin', user.last_name_latin);
    // localStorage.setItem('point', String(user.point));
    // localStorage.setItem('remark', user.remark);
    // localStorage.setItem('image', user.image);
  }

  getLocalStorage () {
    return {
      _id: localStorage.getItem('_id'),
      token: localStorage.getItem('token'),
      fullname: localStorage.getItem('fullname'),
      email: localStorage.getItem('email'),
      // first_name_latin: localStorage.getItem('first_name_latin'),
      // last_name_latin: localStorage.getItem('last_name_latin'),
      chinese_name: localStorage.getItem('chinese_name'),
      no_anggota: localStorage.getItem('no_anggota'),
      status: localStorage.getItem('status'),
      // point: localStorage.getItem('point'),
      // remark: localStorage.getItem('remark'),
      // image: localStorage.getItem('image')
    }
  }

  removeLocalStorage () {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('email');
    localStorage.removeItem('no_anggota');
    localStorage.removeItem('status');
    localStorage.removeItem('chinese_name');
  }

  setChineseNameLocalStorage (chineseName) {
    localStorage.setItem('chinese_name', chineseName);
  }

  async callToast (message: string, position: 'top' | 'middle' | 'bottom', duration: number = 3000, header = '') {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      duration: duration,
      position: position,

    });
    await toast.present();
  }

  async callAlert (header: string = '', subheader: string = '', message: string = '', buttons: any[] = ['Dismiss'], custom: any = {}) {
    const alert = await this.alertController.create({
      header: header ? header : this.connectionError,
      subHeader: subheader,
      message: message,
      buttons: buttons,
      ...custom
    });
    await alert.present();
  }
}
