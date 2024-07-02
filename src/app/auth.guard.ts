import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  console.log(!auth.isAuthenticated() && !auth.isUserParametersSet());
  
  if(!auth.isAuthenticated() && !auth.isUserParametersSet()) {
    router.navigateByUrl('/login')
    return false
}
return true
};
