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

  private tours: Tour[];
  
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
        this.tourService.CreateOrUpdate(new Tour(0, result.tour.name, result.tour.clientName, result.tour.date, result.tour.excursionSights)).subscribe(result => {
          this.getTableData();
        });
      } else {
        this.getTableData();
      }
    });
  }
 
  private getTableData(): void {

    this.tourService.getTours().subscribe(result => {
      console.log(result);
      this.tours = result;
    })
  }
}
