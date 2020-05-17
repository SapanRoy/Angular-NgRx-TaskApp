import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppConfig } from './../../../config/app.config';
import { NewListComponent } from './../../components/list-add/list-new.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromList from '../../state';
import * as listActions from '../../state/list.actions';
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

  openCreatListDialog() {
    this.dialogRef = this.dialog.open(NewListComponent, {
      height: AppConfig.ModelHeight,
      width: AppConfig.ModelWidth,
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Ok') {
        let list:List = {id:null, name:result.data.name, cards:[]};
        this.createList(list);
      }
    });
  }
  createList(list: List): void {
    this.store.dispatch(new listActions.CreateList(list));
  }
}