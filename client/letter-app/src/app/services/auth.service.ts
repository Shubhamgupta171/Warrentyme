// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // Provided in the root injector
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  loginWithGoogle(token: string) {
    return this.http.post('/auth/google-login', { token });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}