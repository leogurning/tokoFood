import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const user = authService.currentUser;
  if (user.token) {
    req = req.clone({
      setHeaders: {
        access_token: user.token
      }
    });
  }
  return next(req);
};
