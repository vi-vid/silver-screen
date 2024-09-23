import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, combineLatest, concatMap, map, noop, of, switchMap } from "rxjs";
import { UserActions } from "../user/user.actions";
import { Store } from "@ngrx/store";
import { fromMovies } from "./movie.selector";
import { MovieActions } from "./movie.actions";
import { HttpClient } from "@angular/common/http";
import { Movie, MovieDetails } from "../../shared/interfaces/movie.interface";

interface MovieDetailsResponse {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

@Injectable()
export class MovieEffects {
    private readonly store = inject(Store);
    private readonly http = inject(HttpClient);
    private readonly actions$ = inject(Actions);

    public addMovieIdToFavorites$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.addMovieIdToFavorites),
            concatLatestFrom(() => this.store.select(fromMovies.selectMovies$)),
            switchMap(([{ id }, movies]) => {
                if (movies[id]) {
                    return of(MovieActions.noopAction());
                } else {
                    return of(MovieActions.getMovie({ id }));
                }
            })
        );
    });

    public getMovie$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MovieActions.getMovie),
            concatMap(({ id }) => {
                return this.http.get(
                    `http://www.omdbapi.com/?i=${encodeURIComponent(id)}&apikey=5f60fd58`
                ).pipe(
                    map((data) => {
                        return MovieActions.getMovieSuccess({ movie: this.mapMovieDetailsApiResponse(data as MovieDetailsResponse) });
                    }),
                    catchError(() => of(MovieActions.getMovieError({
                        error: 'something went wrong during the request, try to fetch your enchanted items a bit later'
                    })))
                );
            })
        );
    });

    private mapMovieDetailsApiResponse(response: MovieDetailsResponse): MovieDetails {
        const releaseDate = new Date(response.Released);
        return {
            title: response.Title,
            year: response.Year,
            id: response.imdbID,
            image: response.Poster === 'N/A' ? undefined : response.Poster,
            rated: response.Rated,
            releaseDate: isNaN(releaseDate.getTime()) ? undefined : releaseDate,
            runtime: response.Runtime,
            genres: response.Genre.split(',').map((value) => value.trim()),
            directors: response.Director.split(',').map((value) => value.trim()),
            writers: response.Writer.split(',').map((value) => value.trim()),
            actors: response.Actors.split(',').map((value) => value.trim()),
            plot: response.Plot,
            languages: response.Language.split(',').map((value) => value.trim()),
            rating: parseFloat(response.imdbRating),
            votes: parseInt(response.imdbVotes.replaceAll(',', '')),
        }
    }
}
