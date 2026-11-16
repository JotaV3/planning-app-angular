import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthForm } from '../auth';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login implements OnInit{
  form!: FormGroup<AuthForm>;

  mode: 'Login' | 'Register' = 'Login';

  ngOnInit(): void {
    this.form = new FormGroup<AuthForm>({
      name: new FormControl<string>('', { nonNullable: true }),
      login: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
      password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  onSwitchMode(mode: 'Login' | 'Register'): void{
    this.mode = mode;

    if(mode === 'Login'){
      this.form.controls.name.clearValidators();
    } else {
      this.form.controls.name.addValidators(Validators.required);
    }

    this.form.controls.name.updateValueAndValidity();
  }
}
