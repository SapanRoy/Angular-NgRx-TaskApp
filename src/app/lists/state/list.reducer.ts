import { List } from '../list';
import { ListActionTypes } from './list.actions';

export interface ListState {
    currentListId: string;
    lists: List[];
    error: string;
}

const initialState: ListState = {
    currentListId: null,
    lists: [],
    error: ''
}

export function reducer(state = initialState, action): ListState {
    switch (action.type) {
        // After a create, the currentList is the new list.
        case ListActionTypes.CreateListSuccess:
            return {
                ...state,
                lists: [...state.lists, action.payload],
                currentListId: action.payload.id,
                error: ''
            };
        case ListActionTypes.LoadSuccess:
            {
                {
                    return {
                        ...state,
                        lists: action.payload,
                        error: ''
                    }
                }
            }
        case ListActionTypes.LoadFail:
            return {
                ...state,
                lists: [],
                error: action.payload
            };

        // After a delete, the currentList is null.
        case ListActionTypes.DeleteListSuccess:
            return {
                ...state,
                lists: state.lists.filter(list => list.id !== action.payload),
                currentListId: null,
                error: ''
            };

        case ListActionTypes.DelelteListFail:
            return {
                ...state,
                error: action.payload
            };


        default:
            return state;
    }
}