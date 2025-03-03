// src/app/components/auth/auth.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  loginWithGoogle() {
    // Implement Google OAuth login logic
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/auth';
    const clientId = 'YOUR_GOOGLE_CLIENT_ID';
    const redirectUri = 'http://localhost:4200/auth';
    const scope = 'profile email https://www.googleapis.com/auth/drive.file';
    window.location.href = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
  }
}