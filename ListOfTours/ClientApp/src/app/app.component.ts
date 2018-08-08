import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import { Person } from '../models/Person';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';

import { DataSharingService } from '../services/DataSharingService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';
  currentUser: Person;
  isUserLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router, private dataSharingService: DataSharingService) {
    
  }

  public logout() {
    this.authService.logout();
  }

  ngOnInit() {
    console.log(this.dataSharingService.isUserLoggedIn)
      this.dataSharingService.isUserLoggedIn.subscribe( value => {
        this.isUserLoggedIn = value;
    });
    console.log(this.dataSharingService.currentUser)
    this.dataSharingService.currentUser.subscribe(value => {
      this.currentUser = value;
    })
  }
}
