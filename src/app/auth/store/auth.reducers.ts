import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    auththenticated: boolean;
}

const initialState: State = {
    token: null,
    auththenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions): State {

    switch (action.type) {

        // sign up / sign in
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                auththenticated: true
            };

        // logout
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                auththenticated: true
            };

        default:
            return state;
    }
}
