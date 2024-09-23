import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey, UserState } from './user.reducer';

export const selectFeature = createFeatureSelector<UserState>(userFeatureKey);

const selectIsLoggedIn$ = createSelector(selectFeature, (state) => Boolean(state.user));
const selectFavorites$ = createSelector(selectFeature, (state) => state.user?.favoriteMovieIds);
const selectUsername$ = createSelector(selectFeature, (state) => state.user?.name);

export const fromUser = {
    selectFavorites$,
    selectIsLoggedIn$,
    selectUsername$,
};
