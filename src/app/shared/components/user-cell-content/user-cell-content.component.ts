import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
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
  public username = input.required<string>();
  public addMovie = output<void>();

  public addMovieClick(): void {
    this.addMovie.emit();
  }
}
