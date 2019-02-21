import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient[];
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };

        case ShoppingListActions.UPDATE_INGREDIENT:

            // we do this to not overwrite the existing state

            // create new object for updated igredient
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };

            // create new list of ingredients and update the ingredient there
            const ingredients = [...state.ingredients];
            ingredients[action.payload.index] = updatedIngredient;

            return {
                ...state,
                ingredients: ingredients
            };

        case ShoppingListActions.DELETE_INGREDIENT:

            // create new list of ingredients and update the ingredient there
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(action.payload, 1);

            return {
                ...state,
                ingredients: oldIngredients
            };

        default:
            return state;
    }

}
