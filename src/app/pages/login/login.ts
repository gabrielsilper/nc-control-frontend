import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../core/models/auth.model';
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as LoginRequest;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erro no componente de login', err);
        },
      });
    }
  }
}
