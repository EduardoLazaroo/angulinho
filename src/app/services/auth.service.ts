import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AuthResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    cargo: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  register(name: string, email: string, password: string, cargo: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, { name, email, password, cargo });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password });
  }
}
