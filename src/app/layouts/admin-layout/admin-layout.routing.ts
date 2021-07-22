import { BrandsComponent } from './../../pages/brands/brands.component';
import { CategoriesComponent } from './../../pages/categories/categories.component';
import { ProductsComponent } from './../../pages/products/products.component';
import { DashboardComponent } from './../../pages/dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const AdminLayoutRoutes: Routes = [
    { path: '',      component: DashboardComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'brand',      component: BrandsComponent },
    { path: 'brand/new',      component: BrandsComponent },
    { path: 'category',      component: CategoriesComponent },
    { path: 'category/new',      component: CategoriesComponent },
    { path: 'products',      component: ProductsComponent },
    { path: 'products/new',      component: ProductsComponent },

  ];
  
