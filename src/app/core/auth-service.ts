import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest } from '../auth/auth';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


const TOKEN_KEY = 'planning_token';

@Injectable({ providedIn: 'root' })
export class AuthService{
    http = inject(HttpClient);
    router = inject(Router);

    baseUrl = 'http://localhost:8080/auth';

    register(registerRequest: RegisterRequest): Observable<AuthResponse>{
        return this.http
            .post<AuthResponse>(`${this.baseUrl}/register`, registerRequest)
            .pipe(tap((res) => localStorage.setItem(TOKEN_KEY, res.token))); // stores token in the 'TOKEN_KEY'
    }

    login(loginRequest: LoginRequest): Observable<AuthResponse>{
        return this.http
            .post<AuthResponse>(`${this.baseUrl}/login`, loginRequest)
            .pipe(tap((res) => localStorage.setItem(TOKEN_KEY, res.token))); // stores token in the 'TOKEN_KEY'
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    isLoggedIn(){
        return !!this.getToken();
    }
}