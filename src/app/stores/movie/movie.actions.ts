import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MovieDetails } from '../../shared/interfaces/movie.interface';

export const MovieActions = createActionGroup({
  source: '[Movie]',
  events: {
    'Noop action': emptyProps(),
    'Get movie': props<{ id: string }>(),
    'Get movie success': props<{ movie: MovieDetails }>(),
    'Get movie error': props<{ error: string }>(),
  },
});
