import { List } from '../list';
/* NgRx */
import { Action } from '@ngrx/store';

export enum ListActionTypes {
    CreateList = '[List] Create List',
    CreateListSuccess = '[List] Create List Success',
    CreateListFail = '[List] Create List Fail',
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
    constructor(public payload: List) { }
}

export class CreateListFail implements Action {
    readonly type = ListActionTypes.CreateListFail;
    constructor(public payload: List) { }
}