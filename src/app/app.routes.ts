import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NotFound } from './pages/not-found/not-found';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreateNonConformity } from './pages/create-non-conformity/create-non-conformity';


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'register', component: Register },
  { path: 'ncs/new', component: CreateNonConformity},
  { path: '**', component: NotFound },
];
