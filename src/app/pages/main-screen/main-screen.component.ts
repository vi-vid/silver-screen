import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GridScreenComponent } from '../../shared/components/grid-screen/grid-screen.component';
import { GridCellComponent } from '../../shared/components/grid-cell/grid-cell.component';
import { UserCellContentComponent } from '../../shared/components/user-cell-content/user-cell-content.component';
import { MovieCellContentComponent } from '../../shared/components/movie-cell-content/movie-cell-content.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MainScreenService } from './main-screen.service';
import { SearchFormComponent } from "../../shared/components/search-form/search-form.component";
import { MovieDetailsComponent } from "../../shared/components/movie-details/movie-details.component";

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [
    GridScreenComponent,
    GridCellComponent,
    UserCellContentComponent,
    MovieCellContentComponent,
    CdkDrag,
    SearchFormComponent,
    MovieDetailsComponent
],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
  providers: [MainScreenService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainScreenComponent {
  private readonly mainScreenService = inject(MainScreenService);

  public vm = this.mainScreenService.vm;

  public isSearchOpen = signal(false);
  public openedMovie = signal<string | null>(null);

  public cells = computed(() => {
    const favorites = this.vm().favoriteIds;

    const viewLength = favorites.length + 1;
    const viewLengthSquareRoot = Math.sqrt(favorites.length + 1);
    const nextOddSquare = Math.pow(
      Math.ceil(viewLengthSquareRoot) % 2 === 0
        ? Math.ceil(viewLengthSquareRoot) + 1
        : Math.ceil(viewLengthSquareRoot),
      2
    );

    return [...favorites, ...Array(nextOddSquare - viewLength).fill(null)].map(
      (favorite, i) => {
        let x = 0,
          y = 0;

        const index = i + 1;
        const layer = Math.floor((Math.sqrt(index) - 1) / 2) + 1;
        const layerStart = (2 * layer - 1) ** 2;
        const positionInLayer = index - layerStart;

        const sideLength = 2 * layer;
        const side = Math.floor(positionInLayer / sideLength);
        const offset = positionInLayer % sideLength;

        switch (side) {
          case 0:
            x = layer;
            y = -layer + 1 + offset;
            break;
          case 1:
            x = layer - 1 - offset;
            y = layer;
            break;
          case 2:
            x = -layer;
            y = layer - 1 - offset;
            break;
          case 3:
            x = -layer + 1 + offset;
            y = -layer;
            break;
        }

        return {
          coordinates: { x, y },
          movieId: favorite,
        };
      }
    );
  });

  public openSearchPanel(): void {
    this.isSearchOpen.set(true);
  }

  public closeSearchPanel(): void {
    this.isSearchOpen.set(false);
  }

  public openDetailsPanel(id: string): void {
    this.openedMovie.set(id);
  }

  public closeDetailsPanel(): void {
    this.openedMovie.set(null);
  }

  public removeMovieFromFavorites(id: string): void {
    this.mainScreenService.removeMovieFromFavorites(id);
    this.closeDetailsPanel();
  }
}
