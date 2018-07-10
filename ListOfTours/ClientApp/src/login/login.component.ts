import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/AuthService";

@Component({  
  selector: "my-login",
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy, OnInit {

  private userName: string;
  private password: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.checkLogin()) 
      this.router.navigate(["home"]);
  }

  login() {
    this.authService.login(this.userName, this.password)
      .subscribe(result => {
        if (result.state == 1) {
          this.router.navigate(["home"]);
        } else {
          alert(result.msg);
        }
      }); 
  }

  ngOnDestroy() {
    //if (this.postStream$) { this.postStream$.unsubscribe() }
  }
}
