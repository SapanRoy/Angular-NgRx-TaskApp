// core
import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'component-list-model',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewListComponent implements OnDestroy, OnInit {
  listName = new FormControl();
  listForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<NewListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
  }
  ngOnInit() {
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  ngOnDestroy() {
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.listForm.controls; }


  close() {
    this.dialogRef.close();
  }

  addList() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.listForm.invalid) {
      return;
    }
  }

}