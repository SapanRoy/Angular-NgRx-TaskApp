import { createFeatureSelector, createSelector } from '@ngrx/store';
/* state  */
import * as fromRoot from '../../state/app.state';
/* reducer */
import * as fromList from './list.reducer';

// Extends the app state to include the list feature.
// This would required when list module is lazy loaded.
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