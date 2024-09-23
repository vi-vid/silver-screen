import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ComponentStore } from '@ngrx/component-store';
import {
  EMPTY,
  Observable,
  catchError,
  debounceTime,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Movie } from '../../interfaces/movie.interface';

interface MovieSearchResponseApiModel {
  Response: string;
  Search?: MovieApiModel[];
  Error?: string;
}

interface MovieApiModel {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface SearchFormState {
  isLoading: boolean;
  error: string | null;
  items: Movie[];
}

@UntilDestroy()
@Injectable()
export class SearchFormStore extends ComponentStore<SearchFormState> {
  private readonly http = inject(HttpClient);

  public vm = computed(() => {
    const items = this.selectSignal((state) => state.items)();
    const isLoading = this.selectSignal((state) => state.isLoading)();
    const error = this.selectSignal((state) => state.error)();

    return {
      items,
      error,
      isLoading,
    }
  });

  public readonly setLoading = this.updater(
    (state: SearchFormState): SearchFormState => ({
      ...state,
      items: [],
      isLoading: true,
      error: null,
    })
  );

  public readonly setError = this.updater(
    (state: SearchFormState, error: string): SearchFormState => ({
      ...state,
      items: [],
      isLoading: false,
      error,
    })
  );

  public readonly searchMovieSuccess = this.updater(
    (state: SearchFormState, items: Movie[]): SearchFormState => ({
      ...state,
      isLoading: false,
      items,
    })
  );

  public readonly searchMovie = this.effect(
    (searchTerm$: Observable<string>) => {
      return searchTerm$.pipe(
        tap(() => {
          this.setLoading();
        }),
        debounceTime(1000),
        switchMap((searchTerm) => {
          if (searchTerm) {
            return this.http.get(
              `http://www.omdbapi.com/?s=${encodeURIComponent(
                searchTerm
              )}&apikey=5f60fd58`
            );
          } else {
            return of(null);
          }
        }),
        tap((response) => {
          const responseApiModel = response as MovieSearchResponseApiModel;
          if (responseApiModel.Search) {
            this.searchMovieSuccess(
              response ? this.mapApiResponse(responseApiModel) : []
            );
          } else {
            this.setError(responseApiModel.Error ?? 'error happened');
          }
        }),
        catchError(() => {
          this.setError('error happened');
          return EMPTY;
        })
      );
    }
  );

  constructor() {
    super({
      isLoading: false,
      error: null,
      items: [],
    });
  }

  private mapApiResponse(response: MovieSearchResponseApiModel): Movie[] {
    return (response.Search || []).map((movie) => {
      return {
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
        id: movie.imdbID,
      };
    });
  }
}
