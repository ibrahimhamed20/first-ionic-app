import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, RECOVER_PASSWORD, RECOVER_PASSWORD_FAIL, RECOVER_PASSWORD_SUCCESS } from "./login.actions";
import { catchError, map, switchMap } from 'rxjs/operators'
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";

@Injectable()
export class LoginEffects {

    constructor(private actions$: Actions, private _auth: AuthService) { }

    recoverPassword$ = createEffect(() => this.actions$.pipe(
        ofType(RECOVER_PASSWORD),
        switchMap((payload: { email: string }) => this._auth.recoverPassword(payload.email).pipe(
            map(() => RECOVER_PASSWORD_SUCCESS()),
            catchError(error => of(RECOVER_PASSWORD_FAIL(error)))
        ))
    ))


    login$ = createEffect(() => this.actions$.pipe(
        ofType(LOGIN),
        switchMap((payload: { email: string, password: string }) =>
            this._auth.login(payload.email, payload.password).pipe(
                map(user => LOGIN_SUCCESS({ user })),
                catchError(error => of(LOGIN_FAIL(error)))
            ))
    ))
}