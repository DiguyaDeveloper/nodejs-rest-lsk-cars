import { AdminRoutes } from './admin.routing';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterVeiculeComponent } from './pages/register-veicule/register-veicule.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ExitVeiculeComponent } from './pages/exit-veicule/exit-veicule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    RegisterVeiculeComponent,
    HomeComponent,
    ExitVeiculeComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(AdminRoutes),
  ]
})
export class AdminModule { }
