import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
// store
import { Store, select } from '@ngrx/store';
// state
import * as fromList from '../../state';
import { Card } from '../cards/card';
// action
import * as listActions from '../../state/list.actions';
import { List } from '../../list';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {
  @Input()
  list: List;

  listName = new FormControl();
  listForm: FormGroup;
  submitted = false;
  editListError$: Observable<string>;

  constructor(private formBuilder: FormBuilder, private store: Store<fromList.State>) { }
  // convenience getter for easy access to form fields
  get formControls() { return this.listForm.controls; }
  ngOnInit() {
    this.listForm = this.formBuilder.group({
      name: [this.list.name, Validators.required]
    });
    this.editListError$ = this.store.pipe(select(fromList.getError));

  }
  toggelEditMode() {
    let updatedList = { ...this.list };
    updatedList.isEditMode = !updatedList.isEditMode;
    this.store.dispatch(new listActions.ToggleListEditMode(updatedList));
  }
  editList(): void {
    let updatedList: List = {...this.list, name: this.listForm.value.name };
    this.store.dispatch(new listActions.EditList(updatedList))
  }
}
