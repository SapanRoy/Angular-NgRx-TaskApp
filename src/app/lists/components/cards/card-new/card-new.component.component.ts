// core
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'component-list-model',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCardComponent implements OnInit {
  parentListId: string;
  parentListName: string;
  cardName = new FormControl();

  cardForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<NewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.parentListName = data;
  }

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.cardForm.controls; }

  close() {
    // send cancel flag to parent
    this.dialogRef.close({ event: 'Cancel'});
  }

  addCard() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.cardForm.invalid) {
      return;
    }
    // send ok flag to parent
    this.dialogRef.close({ event: 'Ok', data: this.cardForm.value });
  }
}