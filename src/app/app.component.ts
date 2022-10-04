import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { SharedService } from './services/shared.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  isCameraOpen: boolean = false;
  subscription: Subscription;

  constructor (private platform: Platform, private sharedService: SharedService) { }

  ngOnInit() {
    if(this.platform.is('mobileweb')) console.log('Web application starting...');
    else this.requestNotification();
    this.subscription = this.sharedService.onCamera.subscribe((result) => {
      this.isCameraOpen = result;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
  }

  requestNotification () {
    console.log('Mobile application starting...');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }

}
