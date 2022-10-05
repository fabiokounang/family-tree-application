import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
    constructor (private router: Router, private sharedService: SharedService) {}

    ngOnInit(): void {
      if (this.sharedService.getLocalStorage() && this.sharedService.getLocalStorage().token) this.router.navigate(['/home', 'homepage']);
    }
}
