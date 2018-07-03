import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authService: AuthService, private router: Router) {
    
  }

  public logout() {
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }

  ngOnInit() {
    //this.authService.getUserInfo$().subscribe(
    //  res => {
    //    if (res != null && res.data) {
    //      let thisuser = res.data
    //      if (thisuser && thisuser.userName) {
    //        this.userName = thisuser.userName;
    //      }
    //    }
    //  });
  }
}
