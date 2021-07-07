import { SharedModule } from './../../components/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ],
})
export class LandingModule { }
