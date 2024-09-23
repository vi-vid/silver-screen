import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromMovies } from '../../../stores/movie/movie.selector';

@Component({
  selector: 'app-movie-cell-content',
  standalone: true,
  imports: [],
  templateUrl: './movie-cell-content.component.html',
  styleUrl: './movie-cell-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCellContentComponent {
  private readonly store = inject(Store);

  public movieId = input<string>();
  public openDetails = output<void>();

  private movies = this.store.selectSignal(fromMovies.selectMovies$);

  public movie = computed(() => {
    const movies = this.movies();
    const id = this.movieId();

    return id ? movies[id] : null;
  });

  public openMovieDetails(): void {
    this.openDetails.emit();
  }
}
