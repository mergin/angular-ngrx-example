import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '@app/shared/ingredient.model';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
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

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions): State {

    switch (action.type) {

        // add ingredient
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };

        // add ingredients
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };

        // update ingredient
        case ShoppingListActions.UPDATE_INGREDIENT:

            // we do this to not overwrite the existing state

            // create new object for updated igredient
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };

            // create new list of ingredients and update the ingredient there
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        // delete ingredient
        case ShoppingListActions.DELETE_INGREDIENT:

            // create new list of ingredients and update the ingredient there
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientIndex, 1);

            return {
                ...state,
                ingredients: oldIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        // start edit mode
        case ShoppingListActions.START_EDIT:

            // create new list of ingredients and update the ingredient there
            const editedIngredient = { ...state.ingredients[action.payload] };

            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            };

        // stop edit mode
        case ShoppingListActions.STOP_EDIT:

            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        default:
            return state;
    }

}
