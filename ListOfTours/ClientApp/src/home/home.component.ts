import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { AuthService } from '../services/AuthService';
import { TourService } from '../services/tourService';

import { IDialogData } from '../models/DialogData';
import { Person } from '../models/Person';
import { Tour } from '../models/Tour';

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

  private tours: Tour[];
  //  = [
  //  new Tour(1, "ATTRACTION BARCELONA", "Rudenko A.", null),
  //  new Tour(2, "ARTISTIC BARCELONA", "Sadovnikova M.", null),
  //  new Tour(3, "TOURIST BUS ONE DAY", "Johanson Van A.", null),
  //  new Tour(4, "BARCELONA HIGHLIGHTS", "Petrov P.", null),
  //  new Tour(5, "DAY TRIP TO PORTAVENTURA", "Parker A.", null)
  //]
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private tourService: TourService,
    private router: Router,
    public dialog: MatDialog
  ) { }

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
    let tourReplica = tour;
    const dialogRef = this.dialog.open(DialogOverview, {
      height: '500px',
      width: '400px',
      data: {
        tour: tourReplica
      }
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result && (result.tour.name && result.tour.clientName)) {
        this.tourService.CreateOrUpdate(new Tour(0, result.tour.name, result.tour.clientName, result.tour.date)).subscribe(result => {
          this.getTableData();
        });
      } else {
        this.getTableData();
      }
    });
  }
 

  // todo: header should be in the service
  private getTableData(): void {

    this.tourService.getTours().subscribe(result => {
      console.log(result);
      this.tours = result;
    })
  }
}
