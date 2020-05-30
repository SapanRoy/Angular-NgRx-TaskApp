import { tap } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
// core
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
// angular material
// store
import { Store, select } from '@ngrx/store';
// state
import * as fromList from '../../state';
// action
import * as listActions from '../../state/list.actions';
import { List } from '../../list';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.scss'],
})
export class NewListComponent implements OnInit {
@ViewChild('inputListName',null) inputListName:any;

  listName = new FormControl();
  listForm: FormGroup;
  submitted = false;
  addListError$: Observable<string>;
  constructor(private store: Store<fromList.State>,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.inputListName.nativeElement.focus();
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.addListError$ = this.store.pipe(select(fromList.getError));
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.listForm.controls; }

  addList() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.listForm.invalid) {
      return;
    }
    let list: List = { id: null, squenceNo: 0, isEditMode: false, name: this.listForm.value.name, cards: [] };
    this.store.dispatch(new listActions.CreateList(list));

    this.addListError$.subscribe(error => {
      if (!error) {
        this.listForm.reset();
        this.submitted = false;
      }
    });
  }
}