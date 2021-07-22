import { Observable } from 'rxjs';
import { InventoryService } from './../../core/service/inventory/inventory.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BlogService } from 'src/app/core/service/blog/blog.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  slideStore =  [
    {
      img: 'https://preview.colorlib.com/theme/pharmative/images/product_01.png',
      title: 'Baby & Child',
      path: ''
    },
    {
      img: 'https://preview.colorlib.com/theme/pharmative/images/product_02.png',
      title: 'Women Care',
      path: ''
    },
    {
      img: 'https://preview.colorlib.com/theme/pharmative/images/product_03.png',
      title: 'Men Care',
      path: ''
    },
    {
      img: 'https://preview.colorlib.com/theme/pharmative/images/product_04.png',
      title: 'Vitamins',
      path: ''
    },
    {
      img: 'https://preview.colorlib.com/theme/pharmative/images/product_05.png',
      title: 'Hair Care',
      path: ''
    },
    {
      img: 'https://preview.colorlib.com/theme/pharmative/images/product_02.png',
      title: 'Skin Care',
      path: ''
    },
   
  ];
  latestStore$: Observable<[]> | any;
  featuredStore$: Observable<[]> | any;
  blogStore$: Observable<[]> | any;
  constructor(private invS: InventoryService, private blogS: BlogService) { }

  ngOnInit(): void {
   this.latestStore$ =  this.invS.latestStore
   this.featuredStore$ =  this.invS.popularStore
   this.blogStore$ = this.blogS.blogStore
  }

}
