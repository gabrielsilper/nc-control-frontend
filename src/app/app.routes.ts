import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NotFound } from './pages/not-found/not-found';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreateNonConformity } from './pages/create-non-conformity/create-non-conformity';
import { MainLayout } from './layouts/main-layout/main-layout';
import { NonConformities } from './pages/non-conformities/non-conformities';
import { Users } from './pages/users/users';
import { Profile } from './pages/profile/profile';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
  { path: 'app/login', component: Login },
  {
    path: 'app',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users},
      { path: 'users/register', component: Register },
      { path: 'ncs', component: NonConformities },
      { path: 'ncs/new', component: CreateNonConformity},
      { path: 'profile', component: Profile},
    ],
  },
  { path: '**', component: NotFound },
];
