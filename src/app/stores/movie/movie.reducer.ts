import { createReducer, on } from '@ngrx/store';
import { MovieDetails } from '../../shared/interfaces/movie.interface';
import { MovieActions } from './movie.actions';

export const movieFeatureKey = 'movie';

export interface MovieState {
  movies: Record<string, MovieDetails>;
}

const initialState: MovieState = {
  movies: {},
};

export const movieReducer = createReducer(
  initialState,
  on(
    MovieActions.getMovieSuccess,
    (state, { movie }): MovieState => {
      return {
        ...state,
        movies: {
          ...state.movies,
          [movie.id]: movie
        }
      };
    }
  ),
);
