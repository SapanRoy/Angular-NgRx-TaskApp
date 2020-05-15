import { List } from '../../list';
import { AppConfig } from './../../../config/app.config';
import { NewListComponent } from './../../components/list-add/list-new.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromList from '../../state';
import * as listActions from '../../state/list.actions';

@Component({
  selector: 'list-shell',
  templateUrl: './list-shell.component.html',
  styleUrls: ['./list-shell.component.scss']
})
export class ListShellComponent implements OnInit {

  lists$: Observable<List[]>;

  constructor(private store: Store<fromList.State>,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.lists$ = this.store.pipe(select(fromList.getLists));
    this.store.dispatch(new listActions.Load());
  }

  openCreatListDialog() {
    this.dialog.open(NewListComponent, {
      height: AppConfig.ModelHeight,
      width: AppConfig.ModelWidth,
    });
  }

  createList(list: List): void {
    this.store.dispatch(new listActions.CreateList(list));
  }
}