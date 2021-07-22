import { OrdersService } from 'src/app/core/service/orders/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  cartTotal: number  = 0;
  totalPrice: number  = 0;
  constructor(private orderS: OrdersService) { }

  ngOnInit(): void {
    this.orderS.cartStore.subscribe(cart => {
      this.cartTotal = cart.length
      this.totalPrice = cart.reduce((a:any, b:any) => a + b['currentPrice'], 0)
      console.log(cart)
      console.log(this.totalPrice)
    })
  }

}
