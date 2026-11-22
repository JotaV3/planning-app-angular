import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth-service";
import { catchError, throwError } from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const service = inject(AuthService);
    const token = service.getToken();

    // public routes
    const isPublic =
        req.url.includes("/auth/login") || req.url.includes("/auth/register");

    const authReq = 
        token && !isPublic // if has token and route is not Public
        ? req.clone({ setHeaders: { Authorization:  `Bearer ${token}` } })
        : req;

    // if the token is expired or invalid, log the user out.
    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
            if(err.status === 401 && !isPublic){
                service.logout();
            }

            return throwError(() => err);
        }),
    );
}