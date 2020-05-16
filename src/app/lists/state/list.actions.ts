import { List } from '../list';
/* NgRx */
import { Action } from '@ngrx/store';

export enum ListActionTypes {
    CreateList = '[List] Create List',
    CreateListSuccess = '[List] Create List Success',
    CreateListFail = '[List] Create List Fail',
    DeleteList = '[List] Delete List',
    DeleteListSuccess = '[List] Delete List Success',
    DelelteListFail = '[List] Delete list Fail',
    Load = '[List] Load',
    LoadSuccess = '[List] Load Success',
    LoadFail = '[List] Load Fail',
}

export class Load implements Action {
    readonly type = ListActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ListActionTypes.LoadSuccess;
    constructor(public payload: List[]) {
    }
}

export class LoadFail implements Action {
    readonly type = ListActionTypes.LoadFail;
    constructor(public payload: string) {
    }
}

export class CreateList implements Action {
    readonly type = ListActionTypes.CreateList;
    constructor(public payload: List) {
    }
}

export class CreateListSuccess implements Action {
    readonly type = ListActionTypes.CreateListSuccess;
    constructor(public payload: List) {
    }
}

export class CreateListFail implements Action {
    readonly type = ListActionTypes.CreateListFail;
    constructor(public payload: List) { }
}

export class DeleteList implements Action {
    readonly type = ListActionTypes.DeleteList;

    constructor(public payload: string) { }
}

export class DeleteListSuccess implements Action {
    readonly type = ListActionTypes.DeleteListSuccess;

    constructor(public payload: string) { }
}
export class DeleteListFail implements Action {
    readonly type = ListActionTypes.DelelteListFail;

    constructor(public payload: string) { }
}