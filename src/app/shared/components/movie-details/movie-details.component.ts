import { Component, computed, inject, input, output } from '@angular/core';
import { fromMovies } from '../../../stores/movie/movie.selector';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  private readonly store = inject(Store);

  public movieId = input<string>();
  public removeFromFavorites = output<void>();

  private movies = this.store.selectSignal(fromMovies.selectMovies$);

  public movie = computed(() => {
    const movies = this.movies();
    const id = this.movieId();

    return id ? movies[id] : null;
  });

  public removeMovieFromFavorites(): void {
    this.removeFromFavorites.emit();
  }
}
