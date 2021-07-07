import { ProductCarouselComponent } from './../product-carousel/product-carousel.component';
import { LandingComponent } from './../../pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { CarouselModule } from 'ngx-owl-carousel-o';



@NgModule({
  declarations: [HeroComponent,  LandingComponent, ProductCarouselComponent],
  exports: [HeroComponent, LandingComponent, ProductCarouselComponent ],
  imports: [
    CommonModule,
    CarouselModule
  ]
})
export class SharedModule { }
