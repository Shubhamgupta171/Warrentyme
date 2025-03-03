// src/app/services/drive.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // Provided in the root injector
})
export class DriveService {
  constructor(private http: HttpClient) {}

  saveToDrive(content: string) {
    const token = localStorage.getItem('token');
    return this.http.post('/drive/save-to-drive', { token, content });
  }

  getFiles() {
    const token = localStorage.getItem('token');
    return this.http.get('/drive/files', { headers: { Authorization: `Bearer ${token}` } });
  }
}