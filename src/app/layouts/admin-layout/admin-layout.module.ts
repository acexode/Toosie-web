import { AdminLayoutComponent } from './admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes} from './admin-layout.routing';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(AdminLayoutRoutes),
  ],
  declarations: [
    
  ]
})

export class AdminLayoutModule {}
