import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  
  constructor() { }

  ngOnInit(): void {
  }

}
