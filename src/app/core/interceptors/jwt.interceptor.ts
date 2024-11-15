import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authData = storageService.getAuthData();

  if (authData && authData.token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authData.token}`),
    });
    return next(authReq);
  }

  return next(req);
};