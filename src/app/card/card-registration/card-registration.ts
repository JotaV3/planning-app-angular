import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CardService } from '../card-service';
import { CardData } from '../card';
import { InvalidField } from '../../common/validation/validation-error';
import { CommonModule } from '@angular/common';

interface CardRegistrationForm {
  name: FormControl<string>;
  brand: FormControl<string>;
}

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-card-registration',
  styleUrl: './card-registration.scss',
  templateUrl: './card-registration.html',
})

export class CardRegistration implements OnInit {
  form!: FormGroup<CardRegistrationForm>;
  service = inject(CardService);

  ngOnInit(): void {
    this.form = new FormGroup<CardRegistrationForm>({
      name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      brand: new FormControl('', {nonNullable: true, validators: [Validators.required]})
    });
  }

  onSubmit(): void{
    if(this.isFormInvalid()) return;
    
    const card = this.form.value as CardData;
    this.service.create(card).subscribe({
      next: (response) => {
        console.log('Card created successfully', response);
      },
      error: (error) => this.onApiError(error)
    });
  }

  private isFormInvalid(): boolean {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Form is invalid');

      return true;
    }

    return false;
  }

  private applyValidationErrors(errors: any): void {
    if (errors?.invalidFieldList) {
      errors.invalidFieldList.forEach((invalidField: InvalidField) => {
        const control = this.form.get(invalidField.name);
        if (control) {
          control.setErrors({ apiError: invalidField.error });
          control.markAsTouched();
        }
      });
    }
  }

  private onApiError(response: any): void {
    if (response.status === 422 && response.error?.invalidFieldList) {
      this.applyValidationErrors(response.error);
    } else {
      console.error('Unexpected error', response);
    }
  }
} 
