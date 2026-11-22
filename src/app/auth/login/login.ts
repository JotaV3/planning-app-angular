import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthForm, LoginRequest, RegisterRequest } from '../auth';
import { AuthService } from '../../core/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login implements OnInit{

  // form group
  form!: FormGroup<AuthForm>;

  // injections
  authService = inject(AuthService);
  router = inject(Router);

  // mode of the form ( 'Register' | 'Login' )
  mode: 'Login' | 'Register' = 'Login';

  ngOnInit(): void {
    this.form = new FormGroup<AuthForm>({
      name: new FormControl<string>('', { nonNullable: true }),
      login: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
      password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  // switch to login or register form mode
  onSwitchMode(mode: 'Login' | 'Register'): void{
    this.mode = mode;

    // name is required when mode === 'Register'
    if(mode === 'Login'){
      this.form.controls.name.clearValidators();
    } else {
      this.form.controls.name.addValidators(Validators.required);
    }

    this.form.controls.name.updateValueAndValidity();
  }

  // on submit form
  onSubmit(): void{
    if(this.form.invalid){
      console.log("Invalid form. Please check that all required fields are filled in.");
      this.form.markAllAsTouched();

      return;
    }

    // handle the submit according to the mode ( 'Register' | 'Login' )
    if(this.mode === 'Register'){
      this.handleRegisterSubmitMode();
    } else {
      this.handleLoginSubmitMode();
    }
  }

  private handleRegisterSubmitMode(): void{ 

    // receive data from the form value as RegisterRequest
    const registerRequest = this.form.value as RegisterRequest;

    this.authService.register(registerRequest).subscribe({
      next: () => this.onAuthSuccess(),

      error: response => this.onAuthError(response)
    });
  }

  private handleLoginSubmitMode(): void{

    // receive data from the form value as LoginRegister
    const loginRequest: LoginRequest = {
      login: this.form.controls.login.value,
      password: this.form.controls.password.value
    };

    this.authService.login(loginRequest).subscribe({
      next: () => this.onAuthSuccess(),

      error: response => this.onAuthError(response)
    });
  }

  private onAuthSuccess(): void{
    void this.router.navigate(['/dashboard']);
  }

  private onAuthError(reponse: any): void{

    // HttpStatus
    switch(reponse.status){

      // 401 = Unauthorized
      case 401:
        console.log("Access denied. Login or password does not match.");
        break;

      // 422 = Unprocessable Content
      case 422:
        console.log("It was not possible to complete the registration. Check whether the form data has been filled in correctly.");
        break;

      // default error message
      default:
        console.log("An error occurred during authentication.");
    }
  }
}
