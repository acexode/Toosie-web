import { MainHeaderComponent } from './../../components/main-header/main-header.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes} from './admin-layout.routing';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    SharedModule,

  ],
  declarations: [
    AdminLayoutComponent
  ]
})

export class AdminLayoutModule {}
