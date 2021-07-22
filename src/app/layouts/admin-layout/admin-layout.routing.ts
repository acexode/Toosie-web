import { DashboardComponent } from './../../pages/dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const AdminLayoutRoutes: Routes = [
    { path: '',      component: DashboardComponent },
    { path: 'dashboard',      component: DashboardComponent }
  ];
  
