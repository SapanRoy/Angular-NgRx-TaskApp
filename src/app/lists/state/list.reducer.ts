import { List } from '../list';
import { ListActionTypes } from './list.actions';
import { Card } from '../components/cards/card';

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
            return {
                ...state,
                lists: action.payload,
                error: ''
            }
        case ListActionTypes.LoadFail:
            return {
                ...state,
                lists: [],
                error: action.payload
            }

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
        // Card
        // After a create, the currentList is the new list.
        case ListActionTypes.CreateCardSuccess:
            {
                let newState = insertCard(state, action);
                return newState;
            }

        // After a delete, the currrentCard is null.
        case ListActionTypes.DeleteCardSuccess:
            return deleleCard(state, action);
        case ListActionTypes.DelelteCardFail:
            return {
                ...state,
                error: action.payload
            };


        default:
            return state;
    }
}
function deleleCard(state, action) {
    try {
        let cardData: any = JSON.parse(JSON.stringify(action.payload));
        let listIndex = state.lists.findIndex(list => list.id === cardData.listId);
        // new copy
        let newLists = state.lists.slice();
        let cardIndex = newLists[listIndex].cards.findIndex(card => card.id === cardData.cardId);
        let newCards = newLists[listIndex].cards.slice();
        // remove card
        newCards.splice(cardIndex, 1);
        let tempList = JSON.parse(JSON.stringify(newLists));
        tempList[listIndex]["cards"] = newCards;
        // new state
        return {
            lists: tempList,
            currentListId: action.payload.id,
            error: ''
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}



function insertCard(state, action) {
    try {
        // Broken in small steps
        // TODO: Optimize code
        let resultCard: Card = JSON.parse(action.payload.card);
        let listIndex = state.lists.findIndex(list => list.id == resultCard.parentListId), cardIndex = 0;
        let newLists = state.lists.slice();
        let newCards;
        if (newLists[listIndex].cards) {
            newCards = newLists[listIndex].cards.slice();
            cardIndex = newLists[listIndex].cards.length - 1;
        } else {
            newCards = new Array<Card>();
        }
        newCards.splice(cardIndex, 0, resultCard);

        let tempList = JSON.parse(JSON.stringify(newLists));
        tempList[listIndex]["cards"] = newCards;
        return {
            lists: tempList,
            currentListId: action.payload.id,
            error: ''
        };
    } catch (err) {
        throw err;
    }
}