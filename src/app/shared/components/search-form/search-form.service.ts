import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserActions } from "../../../stores/user/user.actions";

@Injectable()
export class SearchFormService {
    private readonly store = inject(Store);

    public addMovieToFavorites(id: string): void {
        this.store.dispatch(UserActions.addMovieIdToFavorites({ id }));
    }
}