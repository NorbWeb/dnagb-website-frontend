import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-membership-form',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './membership-form.component.html',
  styleUrl: './membership-form.component.css',
})
export class MembershipFormComponent {
  membershipForm: FormGroup = new FormGroup({
    surname: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    birthplace: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    group: new FormControl(''),
  });

  submitForm() {
    if (this.membershipForm?.valid) {
      console.log(`📢: submitForm -> `, this.membershipForm.value);
    }
  }

  markFormAsTouched() {
    this.membershipForm.markAllAsTouched();
  }
}
