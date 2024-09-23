import { Routes } from '@angular/router';

import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { AuthScreenComponent } from './pages/auth-screen/auth-screen.component';
import { AuthGuard } from './shared/guards/auth-guard.guard';
import { LoginScreenGuard } from './shared/guards/login-screen-guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainScreenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthScreenComponent,
    canActivate: [LoginScreenGuard],
  },
];
