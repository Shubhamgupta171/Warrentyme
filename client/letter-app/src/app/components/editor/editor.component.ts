// src/app/components/editor/editor.component.ts
import { Component } from '@angular/core';
import { DriveService } from '../../services/drive.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  content = '';

  constructor(private driveService: DriveService) {}

  saveToDrive() {
    this.driveService.saveToDrive(this.content).subscribe((res) => {
      console.log('Saved to Google Drive:', res);
      alert(" saved to google account");
    });
  }
}