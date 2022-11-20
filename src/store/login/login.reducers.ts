import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, RECOVER_PASSWORD, RECOVER_PASSWORD_FAIL, RECOVER_PASSWORD_SUCCESS } from "./login.actions";
import { LoginState } from "./LoginState";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    // password reset actions
    on(RECOVER_PASSWORD, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        };
    }),
    on(RECOVER_PASSWORD_SUCCESS, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        };
    }),
    on(RECOVER_PASSWORD_FAIL, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        };
    }),
    // login actions
    on(LOGIN, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        };
    }),
    on(LOGIN_SUCCESS, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: true,
            isLoggingIn: false
        };
    }),
    on(LOGIN_FAIL, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggedIn: false,
            isLoggingIn: false
        };
    })
)

export function loginReducer(state: LoginState, action) {
    return reducer(state, action);
}