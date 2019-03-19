import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions): State {

    switch (action.type) {

        // sign up / sign in
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                authenticated: true
            };

        // logout
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                authenticated: false
            };

        // set token
        case AuthActions.SET_TOKEN:

            return {
                ...state,
                token: action.payload
            };

        default:
            return state;
    }
}
