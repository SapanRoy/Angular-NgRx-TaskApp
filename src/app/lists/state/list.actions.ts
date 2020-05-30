/* NgRx */
import { Action } from '@ngrx/store';
/* entity */
import { Card } from './../components/cards/card';
import { List } from '../list';

export enum ListActionTypes {
    CreateList = '[List] Create List',
    CreateListSuccess = '[List] Create List Success',
    CreateListFail = '[List] Create List Fail',

    EditList = '[List] Edit List',
    EditListSuccess = '[List] Edit List Success',
    EditListFail = '[List] Edit List Fail',

    ToggleListEditMode='[List] Toggle List Edit Mode',

    DeleteList = '[List] Delete List',
    DeleteListSuccess = '[List] Delete List Success',
    DelelteListFail = '[List] Delete list Fail',

    Load = '[List] Load',
    LoadSuccess = '[List] Load Success',
    LoadFail = '[List] Load Fail',

    CreateCard = '[Card] Create Card',
    CreateCardSuccess = '[Card] Create Card Success',
    CreateCardFail = '[Card] Create Card Fail',

    DeleteCard = '[Card] Delete Card',
    DeleteCardSuccess = '[Card] Delete Card Success',
    DelelteCardFail = '[Card] Delete Card Fail',

    MoveCard = "[Card] Move Card",
    MoveCardSuccess = "[Card] Move Card Success",
    MoveCardFail = "[Card] Move Card Fail"
}

export class Load implements Action {
    readonly type = ListActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ListActionTypes.LoadSuccess;
    constructor(public payload: List[]) {
        console.log(payload);
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

export class EditList implements Action {
    readonly type = ListActionTypes.EditList;
    constructor(public payload: List) {
    }
}

export class EditListSuccess implements Action {
    readonly type = ListActionTypes.EditListSuccess;
    constructor(public payload: List) {
    }
}

export class EditListFail implements Action {
    readonly type = ListActionTypes.EditListFail;
    constructor(public payload: List) { }
}

export class ToggleListEditMode implements Action {
    readonly type = ListActionTypes.ToggleListEditMode;
    constructor(public payload: List) {
    }
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

// Card
export class CreateCard implements Action {
    readonly type = ListActionTypes.CreateCard;
    constructor(public payload: Card) {
    }
}

export class CreateCardSuccess implements Action {
    readonly type = ListActionTypes.CreateCardSuccess;
    constructor(public payload: Card) {
    }
}
export class CreateCardFail implements Action {
    readonly type = ListActionTypes.CreateCardFail;
    constructor(public payload: Card) { }
}

export class DeleteCard implements Action {
    readonly type = ListActionTypes.DeleteCard;

    constructor(public payload: any) { }
}
export class DeleteCardFail implements Action {
    readonly type = ListActionTypes.DelelteCardFail;

    constructor(public payload: string) { }
}
export class DeleteCardSuccess implements Action {
    readonly type = ListActionTypes.DeleteCardSuccess;

    constructor(public payload: string) { }
}
export class MoveCard implements Action {
    readonly type = ListActionTypes.MoveCard;

    constructor(public payload: any) { }
}
export class MoveCardFail implements Action {
    readonly type = ListActionTypes.MoveCardFail;

    constructor(public payload: string) { }
}
export class MoveCardSuccess implements Action {
    readonly type = ListActionTypes.MoveCardSuccess;

    constructor(public payload: string) { }
}
