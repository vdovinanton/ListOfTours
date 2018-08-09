import { Inject, OnInit, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { IDialogData } from '../models/DialogData';
import { Tour } from '../models/Tour';

//import { createWiresService } from 'selenium-webdriver/firefox';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})

export class DialogOverview implements OnInit {

  private isEditMode: boolean = false;
  private title: string = "tour";
  private tour: Tour = {
    id: 0, name: "", clientName: "", date: null
  }

  ngOnInit(): void {
    this.isEditMode = this.data.tour != null;
    this.title = this.isEditMode ?
      "Edit " + this.title :
      "Create " + this.title;

    if (!this.isEditMode)
      this.data.tour = this.tour;


    this.data.isEditMode = this.isEditMode;
    console.log('ngOnInit', this.isEditMode);
    console.log('data: ', this.data);
  }
  constructor(
      public dialogRef: MatDialogRef<DialogOverview>,
      @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
