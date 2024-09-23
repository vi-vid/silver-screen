import { createFeatureSelector, createSelector } from '@ngrx/store';
import { movieFeatureKey, MovieState } from './movie.reducer';

export const selectFeature = createFeatureSelector<MovieState>(movieFeatureKey);

const selectMovies$ = createSelector(selectFeature, (state) => state.movies);

export const fromMovies = {
    selectMovies$,
};
