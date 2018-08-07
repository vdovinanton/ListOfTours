import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/AuthService";
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({  
  templateUrl: './registration.component.html',
})

export class RegistrationComponent implements OnDestroy, OnInit {

  private _myForm: FormGroup;

  // todo: user react form
  constructor(private router: Router, private authService: AuthService) { 
    this._myForm = new FormGroup({
      "userEmail": new FormControl("", [
                          Validators.required, 
                          Validators.max(24),
                          Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}") 
                      ]),
      "userName": new FormControl(),
      "userSecondName": new FormControl(),
      "userPassword": new FormControl("", [
                          Validators.required,
                          Validators.minLength(4)
                        ]),
      "confirmPassword": new FormControl("", [
                          Validators.required
                        ])
      }, this.passwordMatchValidator);
  }
  
  private passwordMatchValidator(g: FormGroup) {
    return g.get('userPassword').value === g.get('confirmPassword').value
    ? null : {'mismatch': true};
  }

  ngOnInit() {
    if (this.authService.checkLogin()) 
      this.router.navigate(["home"]);
  }

  submit() {
    let email = this._myForm.controls["userEmail"].value;
    let pwd = this._myForm.controls["userPassword"].value;
    let firstname = this._myForm.controls["userName"].value;
    let secondname = this._myForm.controls["userSecondName"].value;

    this.authService.registration(email, pwd, firstname, secondname)
      .subscribe(result => {
        if (result.state == 1) {
          this.router.navigate(["login"]);
        } else {
          alert(result.msg);
        }
      })
  }

  ngOnDestroy() {
  }
}
