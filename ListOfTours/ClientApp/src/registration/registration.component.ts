import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/AuthService";

@Component({  
  templateUrl: './registration.component.html',
})

export class RegistrationComponent implements OnDestroy, OnInit {

  private _userName: string;
  private _password: string;
  private _confirmPassword: string;
  private _isValidForm: string;

  // todo: user react form
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // if (this.authService.checkLogin()) 
    //   this.router.navigate(["home"]);
  }

  registration() {
    console.log('Do request for registration');
  }

  ngOnDestroy() {
    
  }
}
