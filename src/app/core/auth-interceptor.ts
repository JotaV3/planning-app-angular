import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth-service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const service = inject(AuthService);
    const token = service.getToken();

    // public routes
    const isPublic =
        req.url.includes("/auth/login") || req.url.includes("/auth/register");

    // if has token and route is not Public
    if(token && !isPublic){
        const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });

        return next(authReq);
    }
    
    return next(req);
}