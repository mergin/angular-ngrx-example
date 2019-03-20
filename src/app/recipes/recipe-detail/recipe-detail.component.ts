import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { RecipeService } from '@app/recipes/recipe.service';
import * as ShoppingListActions from '@app/shopping-list/store/shopping-list.actions';
import * as RecipeActions from '@app/recipes/store/recipe.actions';
import * as fromRecipe from '@app/recipes/store/recipe.reducers';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipeState: Observable<fromRecipe.State>;
    id: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromRecipe.FeatureState>
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    this.recipeState = this.store.select('recipes');
                }
            );
    }

    onAddToShoppingList() {
        this.store.select('recipes')
            .pipe(
                take(1)
            )
            .subscribe(
                (recipeState: fromRecipe.State) => {
                    this.store.dispatch(
                        new ShoppingListActions.AddIngredients(
                            recipeState.recipes[this.id].ingredients
                        )
                    );
                }
            );
    }

    onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route });
        // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    }

    onDeleteRecipe() {
        this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
        this.router.navigate(['/recipes']);
    }
}
