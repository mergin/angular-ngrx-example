import { Component, OnInit } from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '@app/auth/store/auth.reducers';
import * as AuthActions from '@app/auth/store/auth.actions';
import * as RecipeActions from '@app/recipes/store/recipe.actions';
import * as fromRecipe from '@app/recipes/store/recipe.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    authState: Observable<fromAuth.State>;

    constructor(
        private store: Store<fromRecipe.FeatureState>
    ) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveData() {
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}
