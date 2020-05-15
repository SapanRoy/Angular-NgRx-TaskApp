import { Component, Inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss'],
})
export class ConfirmationBoxComponent implements OnInit {
  message: string = "This action will delete the";
  item: any;
  title: string;
  constructor(public dialog: MatDialogRef<ConfirmationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ) {
    this.item = data;
  }
  ngOnInit() {
    if (this.item.isList) {
     
    } else {
     
    }
  }
  cancel() {
    this.dialog.close(false);
  }
  confirm() {
    this.dialog.close(true);
  }
}
