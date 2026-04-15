import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { Profile } from '../../core/models/user.model';
import { passwordMatchValidator } from '../../core/validators/custom-validators';

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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      profile: ['0', Validators.required],
    },
    { validators: passwordMatchValidator }
  );

  isSubmitting = false;

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
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Erro ao criar usuário:', err);
      },
    });
  }
}
