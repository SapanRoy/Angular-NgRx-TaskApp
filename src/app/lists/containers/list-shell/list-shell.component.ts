// config
import { AppConfig } from './../../../config/app.config';
// core
import { Component, OnInit } from '@angular/core';
// angular material
import { MatDialog } from '@angular/material';
// store
import { Store, select } from '@ngrx/store';
// rxjs
import { Observable } from 'rxjs';
// component
import { NewListComponent } from './../../components/list-add/list-new.component';
// state
import * as fromList from '../../state';
// action
import * as listActions from '../../state/list.actions';
// entity
import { List } from '../../list';

@Component({
  selector: 'list-shell',
  templateUrl: './list-shell.component.html',
  styleUrls: ['./list-shell.component.scss']
})
export class ListShellComponent implements OnInit {

  lists$: Observable<List[]>;
  dialogRef: any;
  constructor(private store: Store<fromList.State>,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.lists$ = this.store.pipe(select(fromList.getLists));
    this.store.dispatch(new listActions.Load());
  }
}