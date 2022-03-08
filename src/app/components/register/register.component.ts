import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './../../services/login/login.service';
import { User } from './../../../dto/app.dtos';
import { UtilsService } from './../../services/utils/utils.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  tokenSended: boolean;
  userId: any;
  createUserSubscription$: Subscription;
  activateUserSubscription$: Subscription;

  constructor(
    private readonly loginService: LoginService,
    private readonly utilsService: UtilsService,
    private router: Router
  ) {
    this.tokenSended = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = new FormGroup({
      userName: new FormControl({ value: null, disabled: false }, Validators.required),
      lastName: new FormControl({ value: null, disabled: false }, Validators.required),
      email: new FormControl({ value: null, disabled: false }, Validators.required),
      confirmEmail: new FormControl({ value: null, disabled: false }, Validators.required),
      password: new FormControl({ value: null, disabled: false }, Validators.required),
      confirmPassword: new FormControl({ value: null, disabled: false }, Validators.required),
      token: new FormControl({ value: null, disabled: false })
    });
  }

  register() {
    if (this.registerForm.value) {
      const { userName, lastName, email, confirmEmail, confirmPassword, password } = this.registerForm.value;
      if (email === confirmEmail && password === confirmPassword) {
        const user: User = {
          name: userName,
          lastname: lastName,
          mail: email,
          pass: password
        };
        this.createUserSubscription$ = this.loginService.createUser(user).subscribe(entry => {
          if (entry.message !== 'User already exists') {
            this.utilsService.alerts.show({
              severity: 'success',
              summary: 'Register',
              detail: 'Registration has been successful, enter the token sent to your email.'
            });
            this.registerForm.disable();
            this.tokenSended = true;
            this.userId = entry.data.insert;
            this.registerForm.controls.token.enable();
            this.registerForm.controls.token.setValidators(Validators.required);
            this.registerForm.controls.token.updateValueAndValidity();
          } else {
            this.utilsService.alerts.show({
              severity: 'error',
              summary: 'Register',
              detail: 'User already exists.'
            });
          }
        });
      } else if (email === confirmEmail && password !== confirmPassword) {
        this.utilsService.alerts.show({
          severity: 'error',
          summary: 'Password',
          detail: 'Password does not match.'
        });
      } else if (email !== confirmEmail && password === confirmPassword) {
        this.utilsService.alerts.show({
          severity: 'error',
          summary: 'Email',
          detail: 'Email does not match.'
        });
      } else {
        this.utilsService.alerts.show({
          severity: 'error',
          summary: 'Email and Password',
          detail: 'Email and password does not match.'
        });
      }
    }
  }

  activateUser() {
    const { token } = this.registerForm.value;
    const usr = {
      id: this.userId,
      tk: parseInt(token, 10)
    };
    this.activateUserSubscription$ = this.loginService.activateUser(usr).subscribe(entry => {
      if (entry) {
        this.utilsService.alerts.show({
          severity: 'success',
          summary: 'Activate User',
          detail: 'User has been activated successfully.'
        });
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.createUserSubscription$) {
      this.createUserSubscription$.unsubscribe();
    }
    if (this.activateUserSubscription$) {
      this.activateUserSubscription$.unsubscribe();
    }
  }

}
