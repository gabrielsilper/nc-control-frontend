import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { httpErrorMessage } from '../utils/http-error-message';

const LOGIN_SKIP_PATHS = ['/auth/login'];

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const isLoginRoute = LOGIN_SKIP_PATHS.some((path) => req.url.includes(path));

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!isLoginRoute && error.status !== 401) {
        notificationService.show(httpErrorMessage(error.status));
      }
      return throwError(() => error);
    }),
  );
};
