import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { Profile } from '../../core/models/user.model';
import {
  emailFormatValidator,
  nameValidator,
  passwordComplexityValidator,
  passwordMatchValidator,
  profileEnumValidator,
} from '../../core/validators/custom-validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, nameValidator()]],
      email: ['', [Validators.required, emailFormatValidator()]],
      password: ['', [Validators.required, passwordComplexityValidator()]],
      passwordConfirm: ['', Validators.required],
      profile: ['0', [Validators.required, profileEnumValidator()]],
    },
    { validators: passwordMatchValidator }
  );

  isSubmitting = false;

  getFirstError(field: string): string | null {
    const control = this.registerForm.get(field);
    if (!control || !control.errors) return null;
    const errors = control.errors;
    if (errors['required']) return 'Campo obrigatório';
    if (errors['nameMinLength']) return errors['nameMinLength'];
    if (errors['nameMaxLength']) return errors['nameMaxLength'];
    if (errors['nameLettersOnly']) return errors['nameLettersOnly'];
    if (errors['emailFormat']) return errors['emailFormat'];
    if (errors['passwordMinLength']) return errors['passwordMinLength'];
    if (errors['passwordMaxLength']) return errors['passwordMaxLength'];
    if (errors['passwordComplexity']) return errors['passwordComplexity'];
    if (errors['profileEnum']) return errors['profileEnum'];
    return null;
  }

  onRegister(): void {
    if (!this.registerForm.valid) {
      return;
    }

    this.isSubmitting = true;
    const formValue = this.registerForm.value;

    const createUserPayload = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      profile: parseInt(formValue.profile, 10) as Profile,
    };

    this.userService.create(createUserPayload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/app/dashboard']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Erro ao criar usuário:', err);
      },
    });
  }
}
