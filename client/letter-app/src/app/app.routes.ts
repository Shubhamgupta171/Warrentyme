import { Routes } from '@angular/router';
import { EditorComponent } from '../app/components/editor/editor.component';
import { AuthComponent } from '../app/components/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/editor', pathMatch: 'full' },
  { path: 'editor', component: EditorComponent },
  { path: 'auth', component: AuthComponent },
];