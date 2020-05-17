// Core
import { Component, Inject } from '@angular/core';
// Angular Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss'],
})
export class ConfirmationBoxComponent {
  message: string;
  title: string;
  isList: boolean;
  constructor(public dialog: MatDialogRef<ConfirmationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.message = data.message;
    this.title = data.title;
  }
  cancel() {
    this.dialog.close(false);
  }
  confirm() {
    this.dialog.close(true);
  }
}
