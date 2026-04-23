import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

const AUTH_SKIP_PATHS = ['/auth/login', '/auth/refresh'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isSkipped = AUTH_SKIP_PATHS.some((path) => req.url.includes(path));

  const authReq = isSkipped
    ? req
    : req.clone({ setHeaders: { Authorization: `Bearer ${authService.getAccessToken()}` } });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isSkipped) {
        return throwError(() => error);
      }

      const refreshToken = authService.getRefreshToken();

      if (!refreshToken) {
        router.navigate(['/app/login']);
        return throwError(() => error);
      }

      return authService.refresh(refreshToken).pipe(
        switchMap(() => {
          const retryReq = req.clone({
            setHeaders: { Authorization: `Bearer ${authService.getAccessToken()}` },
          });
          return next(retryReq);
        }),
        catchError((refreshError) => {
          authService.logout(refreshToken).subscribe();
          router.navigate(['/app/login']);
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
