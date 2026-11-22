import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth-service";

export const AuthGuard: CanActivateFn = () => {
    const service = inject(AuthService);
    const router = inject(Router);

    if(service.isLoggedIn()){
        return true;
    }

    return router.createUrlTree(['/login']);
}