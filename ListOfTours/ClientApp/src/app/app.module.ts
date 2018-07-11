import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from "../home/home.component";
import { RegistrationComponent } from "../registration/registration.component"

import { AuthService } from "../services/AuthService";
import { DataSharingService } from "../services/DataSharingService";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent
  ],
  imports: [
    //NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signon', component: RegistrationComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'login' },
      //{ path: 'secret', component: SecretComponent, canActivate: [ AuthService] }
    ])
  ],
  providers: [
    AuthService,
    DataSharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
