import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey, UserState } from './user.reducer';

export const selectFeature = createFeatureSelector<UserState>(userFeatureKey);

const selectIsLoggedIn$ = createSelector(selectFeature, (state) => Boolean(state.user));
const selectFavorites$ = createSelector(selectFeature, (state) => state.user?.favoriteMovieIds);

export const fromUser = {
    selectFavorites$,
    selectIsLoggedIn$,
};
