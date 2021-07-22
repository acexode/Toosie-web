import { ProductCarouselComponent } from './../product-carousel/product-carousel.component';
import { LandingComponent } from './../../pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [HeroComponent,  LandingComponent, ProductCarouselComponent],
  exports: [HeroComponent, LandingComponent, ProductCarouselComponent ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
  
  ]
})
export class SharedModule { }
