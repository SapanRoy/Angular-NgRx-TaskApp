import { Card } from './../components/cards/card';
import { Injectable } from '@angular/core';
// rxjs
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
// service
import { ListService } from '../list.service';
import { CardService } from './../components/cards/card.service';
// entity
import { List } from '../list';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
// custom action
import * as listActions from './list.actions';

@Injectable()
export class ListEffects {

    constructor(private listService: ListService,
        private cardService: CardService,
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

    @Effect()
    createCard$: Observable<Action> = this.actions$.pipe(
        ofType(listActions.ListActionTypes.CreateCard),
        map((action: listActions.CreateCard) => action.payload),
        mergeMap((card: Card) =>
            this.cardService.createCard(card).pipe(
                map(newCard => (new listActions.CreateCardSuccess(newCard))),
                catchError(err => of(new listActions.CreateCardFail(err)))
            )
        )
    );

    @Effect()
    deleteCard$: Observable<Action> = this.actions$.pipe(
        ofType(listActions.ListActionTypes.DeleteCard),
        map((action: listActions.DeleteCard) => action.payload),
        mergeMap((cardData:any) =>
            this.cardService.deleteCard(cardData).pipe(
                map(() => (new listActions.DeleteCardSuccess(cardData))),
                catchError(err => of(new listActions.DeleteCardFail(err)))
            )
        )
    );

    @Effect()
    moveCard$: Observable<Action> = this.actions$.pipe(
        ofType(listActions.ListActionTypes.MoveCard),
        map((action: listActions.MoveCard) => action.payload),
        mergeMap((cardData:any) =>
            this.cardService.moveCard(cardData).pipe(
                map(() => (new listActions.Load())),
                catchError(err => of(new listActions.MoveCardFail(err)))
            )
        )
    );

}


