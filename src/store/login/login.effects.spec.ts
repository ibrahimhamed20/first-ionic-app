import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, RECOVER_PASSWORD, RECOVER_PASSWORD_FAIL, RECOVER_PASSWORD_SUCCESS } from "./login.actions";
import { LoginEffects } from "./login.effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/models/user";

describe('Login effects', () => {

    let effects: LoginEffects;
    let actions$: Observable<Action>;
    let error = { error: 'error' };
    let user = new User();
    user.id = 'anyUserId';
    let authServiceMock = {
        recoverPassword: (email: string) => {
            if (email == 'error@email.com') return throwError(error);
            else return of({});
        },
        login: (email: string, password: string) => {
            if (email == 'error@email.com') return throwError(error);
            else return of(user);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([LoginEffects])
            ],
            providers: [
                provideMockActions(() => actions$)
            ]
        }).overrideProvider(AuthService, { useValue: authServiceMock });

        effects = TestBed.get(LoginEffects);
    })

    it('should recover password with existing email return success', (done) => {
        actions$ = of(RECOVER_PASSWORD({ email: 'valid@email.com' }));
        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(RECOVER_PASSWORD_SUCCESS());
            done();
        })
    });


    it('should recover password with not existing email return an error', (done) => {
        actions$ = of(RECOVER_PASSWORD({ email: 'error@email.com' }));
        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(RECOVER_PASSWORD_FAIL(error));
            done();
        })
    });

    it('should login with valid credentials return success', (done) => {
        actions$ = of(LOGIN({ email: 'valid@email.com', password: '123123' }));
        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(LOGIN_SUCCESS({ user }));
            done();
        })
    });

    it('should login with invalid credentials return error', (done) => {
        actions$ = of(LOGIN({ email: 'error@email.com', password: '123456' }));
        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(LOGIN_FAIL(error));
            done();
        })
    });


})