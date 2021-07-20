import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { PathResolveService } from './modules/shared/services/path-resolve.service';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'admin/home',
    pathMatch: 'full',
  }, {
    path: 'admin',
    component: AdminComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }]},
  {
    path: '**',
    resolve: {
      path: PathResolveService,
    },
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {
      useHash: true,
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
