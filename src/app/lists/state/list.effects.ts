import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ListService } from '../list.service';
import { List } from '../list';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as listActions from './list.actions';

@Injectable()
export class ListEffects {

    constructor(private listService: ListService,
        private actions$: Actions) { }


    @Effect()
    loadLists$: Observable<Action> = this.actions$.pipe(
        ofType(listActions.ListActionTypes.Load),
        mergeMap(action =>
            this.listService.getLists().pipe(
                map(lists =>
                    (new listActions.LoadSuccess(lists)
                    )),
                catchError(err => of(new listActions.LoadFail(err)))
            )
        )
    );

    @Effect()
    createList$: Observable<Action> = this.actions$.pipe(
        ofType(listActions.ListActionTypes.CreateList),
        map((action: listActions.CreateList) => action.payload),
        mergeMap((list: List) =>
            this.listService.createList(list).pipe(
                map(newList => (new listActions.CreateListSuccess(newList))),
                catchError(err => of(new listActions.CreateListFail(err)))
            )
        )
    );

    @Effect()
    deletelist$: Observable<Action> = this.actions$.pipe(
        ofType(listActions.ListActionTypes.DeleteList),
        map((action: listActions.DeleteList) => action.payload),
        mergeMap((listId: string) =>
            this.listService.deleteList(listId).pipe(
                map(() => (new listActions.DeleteListSuccess(listId))),
                catchError(err => of(new listActions.DeleteListFail(err)))
            )
        )
    );
}


