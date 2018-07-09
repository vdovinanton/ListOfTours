import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, CanActivate } from '@angular/router';

import { Observable, of } from 'rxjs';

import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators'
import { IRequestResult } from '../models/RequestResult'
import { IPerson } from "../models/Person";
import { DataSharingService } from '../services/DataSharingService';

//const httpOptions = {
//  headers: new HttpHeaders({
//    'Content-Type': 'application/json'
//  })
//};

@Injectable()
export class AuthService implements CanActivate {
  private tokeyKey = "token";

  constructor(private http: HttpClient, private router: Router, private dataSharingService: DataSharingService) { }

  public canActivate() {
    if (this.checkLogin()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  public login(email: string, password: string): Observable<IRequestResult> {
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    let body = JSON.stringify({ "Login": email, "Password": password });
    let options = { headers: header };

    return this.http.post<IRequestResult>('/token', body, options)
      .pipe(
        //catchError(this.handleError('addHero', hero))
        map(
          res => {
            let result = res;
            if (result.state && result.state == 1 && result.data && result.data.accessToken) {
              sessionStorage.setItem(this.tokeyKey, result.data.accessToken);
            }
            return result;
          }
        )
      );
  }

  public logout(): void {
    this.dataSharingService.currentUser.next(null);
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }

  public checkLogin(): boolean {
    let token = sessionStorage.getItem(this.tokeyKey);
    this.dataSharingService.isUserLoggedIn.next(token != null);
    return token != null;
  }

  public currentUser(): Observable<IPerson> {
    let headers = this.initAuthHeaders();

    return this.http.get<IRequestResult>('/currentuser', { headers: headers })
      .pipe(
        map (
          res => {
            let person : IPerson;
            person = res.data as IPerson;
            this.dataSharingService.currentUser.next(person);
            console.log(person);
            return person;
          }
        )
      )
  }

  private initAuthHeaders(): HttpHeaders {
    let token = this.getLocalToken();
    if (token == null) throw "No token";

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + token);
    return headers;
  }

  private getLocalToken(): string {
    return sessionStorage.getItem(this.tokeyKey);
  }
}
