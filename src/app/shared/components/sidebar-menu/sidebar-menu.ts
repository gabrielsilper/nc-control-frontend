import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'sidebar-menu',
  imports: [RouterLink],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.css',
})
export class SidebarMenu {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onLogout() {
    const refreshToken = this.authService.getRefreshToken();

    if (!refreshToken) {
      this.router.navigate(['/app/login']);
      return;
    }

    this.authService.logout(refreshToken).subscribe({
      complete: () => this.router.navigate(['/app/login']),
      error: () => this.router.navigate(['/app/login']),
    });
  }
}
