import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest } from '../auth/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService{
    http = inject(HttpClient);
    baseUrl = 'http://localhost:8080/auth';

    register(registerRequest: RegisterRequest): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.baseUrl}/register`, registerRequest);
    }

    login(loginRequest: LoginRequest): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginRequest);
    }
}