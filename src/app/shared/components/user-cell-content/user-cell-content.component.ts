import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-user-cell-content',
  standalone: true,
  imports: [],
  templateUrl: './user-cell-content.component.html',
  styleUrl: './user-cell-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCellContentComponent {
  public addMovie = output<void>();

  public addMovieClick(): void {
    this.addMovie.emit();
  }
}
