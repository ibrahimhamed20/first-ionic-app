import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { HIDE_LOADER, SHOW_LOADER } from 'src/store/loading/loading.actions';
import { LOGIN, RECOVER_PASSWORD } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/LoginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginStateSubsription: Subscription;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    private _toastr: ToastController) { }

  ngOnInit() {
    this.loginForm = new LoginPageForm(this._fb).createForm();

    this.loginStateSubsription = this._store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onIsLoggedIn(loginState);

      this.onError(loginState);
      this.toggleLoadings(loginState);
    })
  }

  ngOnDestroy(): void {
    if (this.loginStateSubsription) {
      this.loginStateSubsription.unsubscribe();
    }
  }

  private toggleLoadings(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword)
      this._store.dispatch(SHOW_LOADER());
    else
      this._store.dispatch(HIDE_LOADER());
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this._router.navigate(['home']);
    }
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const toastr = await this._toastr.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger'
      });
      toastr.present();
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      const toastr = await this._toastr.create({
        position: 'bottom',
        message: 'recovery email sent',
        color: 'primary'
      });
      toastr.present();
    }
  }


  login() {
    const credentials = this.loginForm.value as { email: string, password: string };
    this._store.dispatch(LOGIN(credentials));
  }

  forget() {
    this._store.dispatch(RECOVER_PASSWORD({ email: this.loginForm.get('email').value }));
  }

  register() {
    this._router.navigate(['register']);
  }
}
