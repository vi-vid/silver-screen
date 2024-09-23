import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GridScreenComponent } from '../../shared/components/grid-screen/grid-screen.component';
import { GridCellComponent } from '../../shared/components/grid-cell/grid-cell.component';
import { Store } from '@ngrx/store';
import { UserActions } from '../../stores/user/user.actions';

@Component({
  selector: 'app-auth-screen',
  standalone: true,
  imports: [GridScreenComponent, GridCellComponent],
  templateUrl: './auth-screen.component.html',
  styleUrl: './auth-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthScreenComponent {
  private store = inject(Store);

  public login(): void {
    this.store.dispatch(UserActions.logInUser());
  }
}
