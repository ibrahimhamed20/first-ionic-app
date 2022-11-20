import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, RECOVER_PASSWORD, RECOVER_PASSWORD_FAIL, RECOVER_PASSWORD_SUCCESS } from 'src/store/login/login.actions';
import { loginReducer } from 'src/store/login/login.reducers';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create a form on init', () => {
    component.ngOnInit();

    expect(component.loginForm).not.toBeUndefined();
  });

  it('should be redirect to register after register click', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forget email/password', () => {
    fixture.detectChanges();
    component.loginForm.get('email').setValue('valid@email.com');
    page.querySelector('#recoverPasswordButton').click();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    });
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    });
  });

  it('given user is recovering password, when success, then hide loading and show success message', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(RECOVER_PASSWORD({ email: 'any@email.com' }));
    store.dispatch(RECOVER_PASSWORD_SUCCESS());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });


  it('given user is recovering password, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(RECOVER_PASSWORD({ email: 'any@email.com' }));
    store.dispatch(RECOVER_PASSWORD_FAIL({ error: 'message' }));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });


  it('should show loading and start login when logging in', () => {

    fixture.detectChanges();
    component.loginForm.get('email').setValue('valid@email.com');
    component.loginForm.get('password').setValue('anyPassword');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    });
  });

  it('given user is logging in, when success, then hide loading and send user to home page', () => {
    spyOn(router, 'navigate');

    fixture.detectChanges();
    store.dispatch(LOGIN({ email: 'valid@email.com', password: '123123' }));
    store.dispatch(LOGIN_SUCCESS({ user: new User() }));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    });
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });


  it('given user is logging in, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any>Promise.resolve({ present: () => { } }));

    fixture.detectChanges();
    store.dispatch(LOGIN({ email: 'error@email.com', password: '12123232' }));
    store.dispatch(LOGIN_FAIL({ error: { message: 'error message' } }));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

});
