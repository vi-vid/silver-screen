import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: '[USER]',
  events: {
    'Log in user': emptyProps(),
    'Add movie id to favorites': props<{ id: string }>(),
    'Remove movie id from favorites': props<{ id: string }>(),
  },
});
