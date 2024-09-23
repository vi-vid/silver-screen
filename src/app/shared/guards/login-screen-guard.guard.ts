import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, switchMap } from 'rxjs';
import { fromUser } from '../../stores/user/user.selector';

@Injectable({ providedIn: 'root' })
export class LoginScreenGuard implements CanActivate {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  public canActivate(): Observable<boolean> | Promise<boolean> {
    return this.store.select(fromUser.selectIsLoggedIn$).pipe(
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          return this.router.navigateByUrl('/');
        }
        return of(true);
      }),
    );
  }
}
