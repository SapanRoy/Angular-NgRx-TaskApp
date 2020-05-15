// core
import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'component-list-model',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCardComponent implements OnDestroy, OnInit {
  parentListId: string;
  parentListName: string;
  cardName = new FormControl();
  private cardListModelSubscription: Subscription;

  cardForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<NewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    this.cardListModelSubscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.cardForm.controls; }

  close() {
    this.dialogRef.close();
  }

  addCard() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.cardForm.invalid) {
      return;
    }
  }
}