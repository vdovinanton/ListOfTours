import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import { IPerson } from '../models/Person';
import { IDialogData } from '../models/DialogData';
import { Tour } from '../models/ITour';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogOverview } from '../utils/DialogOverview';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
})
export class HomeComponent {


  public values: string[];

  //todo: add Guard
  //todo move to service
  private tokeyKey = "token";

  private tours = [
    new Tour(1, "ATTRACTION BARCELONA", "Rudenko A.", null),
    new Tour(2, "ARTISTIC BARCELONA", "Sadovnikova M.", null),
    new Tour(3, "TOURIST BUS ONE DAY", "Johanson Van A.", null),
    new Tour(4, "BARCELONA HIGHLIGHTS", "Petrov P.", null),
    new Tour(5, "DAY TRIP TO PORTAVENTURA", "Parker A.", null)
  ]
  
  constructor(private http: HttpClient, private authService: AuthService, private router: Router, public dialog: MatDialog) { }

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

  createOrUpdate(tour: Tour): void {
    this.openDialog(tour);
  }

  openDialog(tour: Tour): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      height: '500px',
      width: '400px',
      data: {
        tour: tour
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);


      if (result && !result.isEditMode && (result.tour.name && result.tour.clientName))
      {
        // todo: replace for request to server and regresh datasource or via observebol collection
        this.tours.push(new Tour(0, result.tour.name, result.tour.clientName, result.tour.date));
      }  

      console.log('tour', this.tours);
    });
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
