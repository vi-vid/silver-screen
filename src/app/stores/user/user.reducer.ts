import { createReducer, on } from '@ngrx/store';
import { User } from '../../shared/interfaces/user.interface';
import { UserActions } from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(
    UserActions.logInUser,
    (state): UserState => {
      return {
        ...state,
        user: {
          name: 'user.name',
          favoriteMovieIds: new Set([]),
        },
      };
    }
  ),
  on(
    UserActions.addMovieIdToFavorites,
    (state, { id }): UserState => {
        const favoriteMovieIds = new Set(state.user?.favoriteMovieIds);
        favoriteMovieIds.add(id);
        return {
            ...state,
            user: state.user ? {
              ...state.user,
              favoriteMovieIds,
            } : null
          };
    }
  ),
  on(
    UserActions.removeMovieIdFromFavorites,
    (state, { id }): UserState => {
        const favoriteMovieIds = new Set(state.user?.favoriteMovieIds);
        favoriteMovieIds.delete(id);
        return {
            ...state,
            user: state.user ? {
              ...state.user,
              favoriteMovieIds,
            } : null
          };
    }
  )
);
