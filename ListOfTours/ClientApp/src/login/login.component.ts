import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/AuthService";
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({  
  selector: "my-login",
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy, OnInit {

  private _myForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this._myForm = new FormGroup({
      "userEmail": new FormControl("", [
                          Validators.required, 
                          Validators.max(24),
                          Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}") 
                      ]),
      "userPassword": new FormControl("", [
                          Validators.required,
                          Validators.minLength(4)
                        ])
      });
  }

  ngOnInit() {
    if (this.authService.checkLogin()) 
      this.router.navigate(["home"]);
  }

  submit(){
    let email = this._myForm.controls["userEmail"].value;
    let pwd = this._myForm.controls["userPassword"].value;
    this.authService.login(email, pwd)
      .subscribe(result => {
        if (result.state == 1) {
          this.router.navigate(["home"]);
        } else {
          alert(result.msg);
        }
      }); 
  }

  login() {
    this.authService.login(this._myForm.controls.value.toString(), this._myForm.controls.password.toString())
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
