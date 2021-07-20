import { ExitVeiculeComponent } from './pages/exit-veicule/exit-veicule.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterVeiculeComponent } from './pages/register-veicule/register-veicule.component';
import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterVeiculeComponent },
  { path: 'exit', component: ExitVeiculeComponent },
  // { path: 'list', component: ListVeiculeComponent },
];
