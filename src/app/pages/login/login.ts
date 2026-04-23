import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../core/models/auth.model';
import { emailFormatValidator } from '../../core/validators/custom-validators';
import { httpErrorMessage } from '../../core/utils/http-error-message';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  apiError = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, emailFormatValidator()]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
  });

  getFirstError(field: string): string | null {
    const control = this.loginForm.get(field);
    if (!control || !control.errors) return null;
    const errors = control.errors;
    if (errors['required']) return 'Campo obrigatório';
    if (errors['emailFormat']) return errors['emailFormat'];
    if (errors['minlength']) return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `Máximo de ${errors['maxlength'].requiredLength} caracteres`;
    return null;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.apiError.set(null);
      const credentials = this.loginForm.value as LoginRequest;

      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/app/dashboard']);
        },
        error: (err) => {
          this.apiError.set(httpErrorMessage(err.status));
        },
      });
    }
  }
}
