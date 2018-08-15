import { Inject, OnInit, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { ContainerComponent, DraggableComponent, IDropResult } from 'ngx-smooth-dnd';

import { TourService } from '../services/tourService';
import { IDialogData } from '../models/DialogData';
import { Tour } from '../models/Tour';
import { ExcursionSight } from '../models/ExcursionSight';
import { createWiresService } from 'selenium-webdriver/firefox';

import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})

export class DialogOverview implements OnInit {

  private isEditMode: boolean = false;

  private title: string = "tour";

  private tour: Tour = {
    id: 0, name: "", clientName: "", date: null, excursionSights: null
  }

  private _tours: Tour[];
  private _dataLoaded: boolean;
  private _myForm: FormGroup;
  private _selectedTour: Tour;
  private _excursionSights: ExcursionSight[];

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    private tourService: TourService,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {
    this._myForm = new FormGroup({
      "toursAutocomplete": new FormControl("", [
        Validators.required
      ]),
      "excursionAutocomplete": new FormControl("", [
        Validators.required
      ]),
      "datePicker": new FormControl("", [
        Validators.required
      ]),
      "clientName": new FormControl("", [
        Validators.required
      ])
    });
  }

  submit() {
    //let name = this._myForm.controls["clientName"].value;
    //let pwd = this._myForm.controls["userPassword"].value;

    console.log('submit');

  }

  onTourClick(tour: Tour): void
  {
    this.onTourInputChange();
    this.tourService.getExcursions(tour.id).subscribe(result => {
      this._excursionSights = result;
    })
  }

  onTourInputChange(): void {
    this._excursionSights = [];
  }

  onExcursionClick(tour: Tour): void {
    console.log('onExcursionClick');
  }

  ngOnInit(): void {
    this.tourService.getTours().subscribe(result => {
      this._tours = result;
    })

    
    this._dataLoaded = true;
    //this.isEditMode = this.data.tour != null;
    //this.title = this.isEditMode ?
    //  "Edit " + this.title :
    //  "Create " + this.title;

    //if (!this.isEditMode)
    //  this.data.tour = this.tour;

    //this.data.tour.excursionSights.sort(function (a, b) { return (a.orderIndex > b.orderIndex) ? 1 : ((b.orderIndex > a.orderIndex) ? -1 : 0); });

    //this.data.isEditMode = this.isEditMode;
    //console.log('ngOnInit', this.isEditMode);
    //console.log('data: ', this.data);
  }

  //this.onFormChanges();
  //onFormChanges(): void {
  //  this._myForm.valueChanges.subscribe(result => {
  //    if (result["toursAutocomplete"]) {
  //      //this._myForm.controls["toursAutocomplete"].value = "";
  //      console.log(result["toursAutocomplete"]);
  //    }
  //  });
  //}

  onDrop(dropResult: IDropResult) {
    // update item list according to the @dropResult
    console.log(dropResult);
    this._excursionSights = this.applyDrag(this._excursionSights, dropResult);

    for (let i = 0; i < this._excursionSights.length; i++)
    {
      this._excursionSights[i].orderIndex = i;
      this._excursionSights[i].orderIndex++;
    }
    
    //var temp = this.data.tour.excursionSights[dropResult.removedIndex].orderIndex;
    //this.data.tour.excursionSights[dropResult.removedIndex].orderIndex = this.data.tour.excursionSights[dropResult.addedIndex].orderIndex;
    //this.data.tour.excursionSights[dropResult.addedIndex].orderIndex = temp;
  }

  applyDrag (arr, dragResult) {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
  };

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
