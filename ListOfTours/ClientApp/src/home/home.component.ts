import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import { IPerson } from '../models/Person';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
})
export class HomeComponent {


  public values: string[];

  //todo: add Guard
  //todo move to service
  private tokeyKey = "token";

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.checkLogin()) {

      // getting current user for set property 
      // dataSharingService.currentUser in the DataSharingService
      this.authService.currentUser().subscribe(() => { },
       error => console.error(error));

        this.getTableData() // mock
    } else {
      this.router.navigate(["login"]);
    }
  }

  // todo: header should be in the service
  private getTableData(): void {
    let header = this.initAuthHeaders();
    let options = { headers: header };


    this.http.get('/api/values', options).subscribe(result => {
      this.values = result as string[];
    }, error => console.error(error));
  }

  private getLocalToken(): string {
    return sessionStorage.getItem(this.tokeyKey);
  }

  private initAuthHeaders(): HttpHeaders {
    let token = this.getLocalToken();
    if (token == null) throw "No token";

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + token);
    return headers;
  }
}
