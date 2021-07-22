import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutsComponent } from './layouts/main-layouts/main-layouts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: MainLayoutsComponent,
    loadChildren: () =>
      import('./layouts/main-layouts/main-layouts.module').then(
        (m) => m.MainLayoutsModule
      ),
    // canActivate: [AuthGuard],
    data: {
      title: 'Home',
      path: 'home'
    }
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./layouts/admin-layout/admin-layout.module').then(
        (m) => m.AdminLayoutModule
      ),
    data: { title: 'Admin Dashboard', path: 'admin' },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./layouts/auth/auth.module').then(
        (m) => m.AuthModule
      ),
    data: { title: 'Admin Dashboard', path: 'admin' },
  },
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
