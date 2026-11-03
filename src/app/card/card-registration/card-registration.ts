import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

interface CardRegistrationForm {
  name: FormControl<string>;
  brand: FormControl<string>;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-card-registration',
  styleUrl: './card-registration.scss',
  templateUrl: './card-registration.html',
})

export class CardRegistration implements OnInit {
  form!: FormGroup<CardRegistrationForm>;

  ngOnInit(): void {
    this.form = new FormGroup<CardRegistrationForm>({
      name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      brand: new FormControl('', {nonNullable: true, validators: [Validators.required]})
    });
  }

  onSubmit(): void{
    if(this.form.valid) {
      console.log('Form Submitted', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
} 
