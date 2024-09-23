import { Injectable, Signal, computed, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { fromUser } from "../../stores/user/user.selector";
import { MainScreenVM } from "./main-screen.vm";
import { UserActions } from "../../stores/user/user.actions";

@Injectable()
export class MainScreenService {
    private readonly store = inject(Store);
    
    public vm: Signal<MainScreenVM> = computed(() => {
        const favoriteIdSet = this.store.selectSignal(fromUser.selectFavorites$)();
        return {
            favoriteIds: [...(favoriteIdSet || [])]
        };
    });

    public removeMovieFromFavorites(id: string): void {
        this.store.dispatch(UserActions.removeMovieIdFromFavorites({ id }));
    }
}
