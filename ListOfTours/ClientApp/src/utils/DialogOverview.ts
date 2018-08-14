import { Inject, OnInit, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { ContainerComponent, DraggableComponent, IDropResult } from 'ngx-smooth-dnd';

import { IDialogData } from '../models/DialogData';
import { Tour } from '../models/Tour';
import { ExcursionSight } from '../models/ExcursionSight';
import { createWiresService } from 'selenium-webdriver/firefox';


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

  ngOnInit(): void {
    this.isEditMode = this.data.tour != null;
    this.title = this.isEditMode ?
      "Edit " + this.title :
      "Create " + this.title;

    if (!this.isEditMode)
      this.data.tour = this.tour;

    // objs.sort(function(a,b) {return (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0);} ); 

    this.data.tour.excursionSights.sort(function (a, b) { return (a.orderIndex > b.orderIndex) ? 1 : ((b.orderIndex > a.orderIndex) ? -1 : 0); });

    this.data.isEditMode = this.isEditMode;
    console.log('ngOnInit', this.isEditMode);
    console.log('data: ', this.data);
  }
  constructor(
      public dialogRef: MatDialogRef<DialogOverview>,
      @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {  }

  onDrop(dropResult: IDropResult) {
    // update item list according to the @dropResult
    console.log(dropResult);
    this.data.tour.excursionSights = this.applyDrag(this.data.tour.excursionSights, dropResult);
    console.log(this.data.tour.excursionSights);


    for (let i = 0; i < this.data.tour.excursionSights.length; i++)
    {
      //console.log(this.data.tour.excursionSights[i]);
      this.data.tour.excursionSights[i].orderIndex = i;
      this.data.tour.excursionSights[i].orderIndex++;
    }


    console.log(this.data.tour.excursionSights);
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
