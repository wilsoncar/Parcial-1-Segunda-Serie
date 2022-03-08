import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './../../services/login/login.service';
import { UtilsService } from './../../services/utils/utils.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../services/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginSubscription$: Subscription;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly utilsService: UtilsService,
    private readonly router: Router,
    private tokenStorage: TokenStorageService
    ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl({ value: null, disabled: false }, Validators.required),
      password: new FormControl({ value: null, disabled: false }, Validators.required)
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    const obj = {
      mail: email,
      pass: password
    };
    this.loginSubscription$ = this.loginService.login(obj).subscribe(entry => {
      if (entry.message !== 'access deny') {
        this.utilsService.alerts.show({
          severity: 'success',
          summary: 'Home',
          detail: 'Successful login.'
        });
        this.tokenStorage.saveToken(entry.data.token);
        this.tokenStorage.saveUser(entry.data);
        this.router.navigate(['/home']);
      } else {
        this.utilsService.alerts.show({
          severity: 'error',
          summary: 'Denied',
          detail: 'Access denied.'
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription$) {
      this.loginSubscription$.unsubscribe();
    }
  }

}
