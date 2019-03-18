export interface State {
    token: string;
    auththenticated: boolean;
}

const initialState: State = {
    token: null,
    auththenticated: false
};

export function authReducer(state = initialState, action) {
    return state;
}
