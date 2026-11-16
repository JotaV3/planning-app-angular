import { FormControl } from "@angular/forms";

export class LoginRequest{
    login!: string;
    password!: string;
}

export class RegisterRequest{
    name!: string;
    login!: string;
    password!: string;
}

export interface AuthForm{
    name: FormControl<string>;
    login: FormControl<string>;
    password: FormControl<string>;
}

export interface AuthResponse{
    token: string;
    type: string;
    expiresAt: number;
    userName: string;
}