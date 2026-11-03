import { Component, OnInit, inject} from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CardService } from '../card-service';
import { CardData } from '../card';

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
  service = inject(CardService);

  ngOnInit(): void {
    this.form = new FormGroup<CardRegistrationForm>({
      name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      brand: new FormControl('', {nonNullable: true, validators: [Validators.required]})
    });
  }

  onSubmit(): void{
    if(this.form.valid) {
      const card = this.form.value as CardData;
      this.service.create(card).subscribe({
        next: (response) => {
          console.log('Card created successfully', response);
        },
        error: (error) => {
          console.error('Error creating card', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
} 
