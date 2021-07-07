import { MainHeaderComponent } from './../../components/main-header/main-header.component';
import { SharedModule } from './../../components/shared/shared.module';
import { HeroComponent } from './../../components/hero/hero.component';
import { MainLayoutsComponent } from './main-layouts.component';
import { FooterComponent } from './../../components/footer/footer.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutsRoutingModule } from './main-layouts-routing.module';


@NgModule({
  declarations: [
    MainLayoutsComponent,
    MainHeaderComponent,
    FooterComponent
    ],
  imports: [
    CommonModule,
    MainLayoutsRoutingModule,
    SharedModule
  ]
})
export class MainLayoutsModule { }
