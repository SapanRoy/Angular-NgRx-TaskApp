import * as listActions from './list.actions';
import { reducer, ListState } from './list.reducer';
describe('listReducer', () => {
    it('should create a list', () => {
        const currentstate: ListState = {
            currentListId: null,
            lists: [],
            error: ''
        }
        let list = { id: "1", name: "TODO", cards: [] };
        const expectedResult: ListState = {
            currentListId: "1",
            lists: [{ id: "1", name: "TODO", cards: [] }],
            error: ''
        }
        // Create list 
        const action = new listActions.CreateListSuccess(list);
        const result = reducer(currentstate, action);
        expect(result).toEqual(expectedResult);
    });
    it('should delete a list', () => {
        const currentstate: ListState = {
            currentListId: null,
            lists: [{ id: "1", name: "TODO", cards: [] }],
            error: ''
        }
        const expectedResult: ListState = {
            currentListId: null,
            lists: [],
            error: ''
        }

        // Delete list by id
        const action = new listActions.DeleteListSuccess("1");
        const result = reducer(currentstate, action);
        expect(result).toEqual(expectedResult);
    });
});