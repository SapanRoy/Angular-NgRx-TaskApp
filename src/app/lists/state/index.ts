import { Card } from './../components/cards/card';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromList from './list.reducer';
import { state } from '../../../../node_modules/@angular/animations';

// Extends the app state to include the product feature.
// This would required if lists are lazy loaded.
// So the reference to ListState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    lists: fromList.ListState;
}

// Selector functions
const getListFeatureState = createFeatureSelector<fromList.ListState>('lists');

export const getLists = createSelector(
    getListFeatureState,
    state => state.lists
);

// export const getListById = createSelector(
//     getLists,
//     list => (id: string) => list[id]
// );


