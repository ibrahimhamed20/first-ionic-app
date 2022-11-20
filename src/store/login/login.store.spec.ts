import { User } from "src/app/models/user"
import { AppInitialState } from "../AppInitialState"
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, RECOVER_PASSWORD, RECOVER_PASSWORD_FAIL, RECOVER_PASSWORD_SUCCESS } from "./login.actions"
import { loginReducer } from "./login.reducers"
import { LoginState } from "./LoginState"

describe("login store", () => {

    it('recoverPassword', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, RECOVER_PASSWORD({ email: 'any@email.com' }));
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        });
    })

    it('recoverPasswordSuccess', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, RECOVER_PASSWORD_SUCCESS());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        });
    })

    it('recoverPasswordFail', () => {
        const initialState: LoginState = AppInitialState.login;
        const error = { error: 'error' };
        const newState = loginReducer(initialState, RECOVER_PASSWORD_FAIL(error));
        expect(newState).toEqual({
            ...initialState,
            error: error.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        });
    })


    it('login', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, LOGIN({ email: 'any@email.com', password: '123123' }));
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        });
    })

    it('loginSuccess', () => {
        const initialState: LoginState = AppInitialState.login;
        const user = new User();
        user.id = 'anyId';
        const newState = loginReducer(initialState, LOGIN_SUCCESS({ user }));
        expect(newState).toEqual({
            ...initialState,
            isLoggedIn: true,
            isLoggingIn: false
        });
    })

    it('loginFail', () => {
        const initialState: LoginState = AppInitialState.login;
        const error = { error: 'error' };
        const newState = loginReducer(initialState, LOGIN_FAIL(error));
        expect(newState).toEqual({
            ...initialState,
            error: error.error,
            isLoggedIn: false,
            isLoggingIn: false
        });
    })

})