import { HttpInterceptorFn } from '@angular/common/http';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
