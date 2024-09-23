import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, noop } from "rxjs";
import { UserActions } from "./user.actions";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {
    private readonly router = inject(Router);
    private readonly actions$ = inject(Actions);

    public logInUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.logInUser), 
            map(() => {
                this.router.navigateByUrl('/');
                return noop();
            })
        );
        
    }, {
        dispatch: false
    });
}
