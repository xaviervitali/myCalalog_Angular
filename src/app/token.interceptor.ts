import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = window.localStorage.getItem('token');

  // req = req.clone({
  //   setHeaders: { language: navigator.language }
  // });

  if (!token) {
    return next(req);
  }

  const requestCopy = req.clone({
    setHeaders: { Authorization: 'Bearer ' + token },
  });

  return next(requestCopy);
};
