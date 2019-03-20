import { Action } from '@ngrx/store';
import { Recipe } from '@app/recipes/recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const STORE_RECIPES = 'STORE_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';

// set recipes
export class SetRecipes implements Action {

    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) { }
}

// add recipe
export class AddRecipe implements Action {

    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) { }
}

// update recipe
export class UpdateRecipe implements Action {

    readonly type = UPDATE_RECIPE;

    constructor(public payload: { index: number, updatedRecipe: Recipe }) { }
}

// delete recipe
export class DeleteRecipe implements Action {

    readonly type = DELETE_RECIPE;

    constructor(public payload: number) { }
}

// store recipes
export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}

// fetch recipes
export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

// list of action types
export type RecipeActions =
    SetRecipes |
    AddRecipe |
    UpdateRecipe |
    DeleteRecipe |
    StoreRecipes |
    FetchRecipes;
