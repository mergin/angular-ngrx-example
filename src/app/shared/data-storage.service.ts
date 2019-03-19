import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '@app/recipes/recipe.service';
import { Recipe } from '@app/recipes/recipe.model';

@Injectable()
export class DataStorageService {

    private serverURL = 'https://udemy-recipes-angular-tutorial.firebaseio.com';

    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService
    ) { }

    storeRecipes() {
        // const headers = new HttpHeaders().set('Authorization', 'Bearer afdklasflaldf');

        // return this.httpClient.put('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
        //   observe: 'body',
        //   params: new HttpParams().set('auth', token)
        //   // headers: headers
        // });
        const req = new HttpRequest(
            'PUT',
            `${this.serverURL}/recipes.json`,
            this.recipeService.getRecipes(),
            { reportProgress: true }
        );
        return this.httpClient.request(req);
    }

    getRecipes() {
        // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
        this.httpClient.get<Recipe[]>(`${this.serverURL}/recipes.json`, {
            observe: 'body',
            responseType: 'json'
        })
            .map(
                (recipes) => {
                    console.log(recipes);
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
