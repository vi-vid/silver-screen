import { ActionReducerMap } from '@ngrx/store';
import { userFeatureKey, userReducer, UserState } from './user/user.reducer';
import {
  movieFeatureKey,
  movieReducer,
  MovieState,
} from './movie/movie.reducer';

export interface AppState {
  [userFeatureKey]: UserState;
  [movieFeatureKey]: MovieState;
}

export const appReducers: ActionReducerMap<AppState> = {
  [userFeatureKey]: userReducer,
  [movieFeatureKey]: movieReducer,
};
