// rxjs
import { Observable } from 'rxjs';
// core
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
// store
import { Store, select } from '@ngrx/store';
// state
import * as fromList from '../../state';
// action
import * as listActions from '../../state/list.actions';
import { List } from '../../list';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {

  @ViewChild('inputListName',null) inputListName:any;

  @Input()
  list: List;

  listEditName = new FormControl();
  listEditForm: FormGroup;
  editSubmitted = false;
  editListError$: Observable<string>;

  constructor(private formBuilder: FormBuilder, private store: Store<fromList.State>) { }
  // convenience getter for easy access to form fields
  get formControls() { return this.listEditForm.controls; }
  ngOnInit() {
    this.inputListName.nativeElement.focus();
    this.listEditForm = this.formBuilder.group({
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
    this.editSubmitted = true;
    // stop here if form is invalid
    if (this.listEditForm.invalid) {
      return;
    }
    let updatedList: List = {...this.list, name: this.listEditForm.value.name };
    this.store.dispatch(new listActions.EditList(updatedList))
  }
}
