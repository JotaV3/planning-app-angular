import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest } from '../auth/auth';
import { Observable, tap } from 'rxjs';


const TOKEN_KEY = 'planning_token';

@Injectable({ providedIn: 'root' })
export class AuthService{
    http = inject(HttpClient);
    baseUrl = 'http://localhost:8080/auth';

    register(registerRequest: RegisterRequest): Observable<AuthResponse>{
        return this.http
            .post<AuthResponse>(`${this.baseUrl}/register`, registerRequest)
            .pipe(tap((res) => localStorage.setItem(TOKEN_KEY, res.token)));
    }

    login(loginRequest: LoginRequest): Observable<AuthResponse>{
        return this.http
            .post<AuthResponse>(`${this.baseUrl}/login`, loginRequest)
            .pipe(tap((res) => localStorage.setItem(TOKEN_KEY, res.token)));
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(TOKEN_KEY);
    }
}