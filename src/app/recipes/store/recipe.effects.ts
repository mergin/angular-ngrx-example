import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as RecipeActions from '@app/recipes/store/recipe.actions';
import { Recipe } from '@app/recipes/recipe.model';
import * as fromRecipe from '@app/recipes/store/recipe.reducers';

@Injectable()
export class RecipeEffects {

    private serverURL = 'https://udemy-recipes-angular-tutorial.firebaseio.com';

    // fetch recipes
    @Effect()
    recipeFetch = this.actions$
        .pipe(
            ofType(RecipeActions.FETCH_RECIPES),
            switchMap(
                (action: RecipeActions.FetchRecipes) => {
                    return this.httpClient.get<Recipe[]>(`${this.serverURL}/recipes.json`, {
                        observe: 'body',
                        responseType: 'json'
                    });
                }
            ),
            map(
                (recipes) => {
                    console.log(recipes);
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: RecipeActions.SET_RECIPES,
                        payload: recipes
                    };
                }
            )
        );

    // store recipes
    @Effect({ dispatch: false })
    recipeStore = this.actions$
        .pipe(
            ofType(RecipeActions.STORE_RECIPES),
            withLatestFrom(
                this.store.select('recipes')
            ),
            switchMap(
                ([action, state]: [RecipeActions.StoreRecipes, fromRecipe.State]) => {
                    return this.httpClient.put<Recipe[]>(
                        `${this.serverURL}/recipes.json`,
                        state.recipes,
                        { reportProgress: true }
                    );
                }
            )
        );

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>
    ) { }
}
