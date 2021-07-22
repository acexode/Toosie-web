import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { OrdersService } from 'src/app/core/service/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AddRefillService } from 'src/app/core/service/add-refill/add-refill.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$: Observable<any> | undefined;
  lists: any = [];
  total = 0;
  grandTotal = 0;
  discount= 0;
  constructor(private orderS: OrdersService, private router: Router,
    private refillS: AddRefillService) { }

  ngOnInit() {
    this.cart$ = this.orderS.cartStore
    this.orderS.cartStore.subscribe((e:any) =>{
      console.log(e);
      this.lists = isEmpty(e) ? [] : e;
      this.total = this.lists.reduce((a:any, b:any) => a + (b['actualPrice'] * b['quantity']),0)
      this.discount = this.lists.reduce((a:any, b:any) => {
        console.log(a + ((b['actualPrice'] - b['currentPrice'])))
        return a + ((b['actualPrice'] - b['currentPrice']))
      },0)
      console.log(this.discount)
      
    });
  }
  removeItem(item: any){
    this.orderS.removeItemFromCart(item);
  }
  incrementDecrement(item: any, type: string){
    this.orderS.incrementDecrement(item, type);
  }
  refill(item: any){
    this.refillS.refill(item).subscribe(e =>{
      console.log(e);
      alert('product added to refill');
    });
  }
  checkout(){
   const  checkoutProps =  {
      subTotal: this.total,
      grandTotal: this.total - this.discount,
      items: this.lists
    }
    this.orderS.checkoutDetails.next(checkoutProps)
    this.router.navigate(['/home/checkout'])
  }
  
  // async presentModal(list: { itemName: any; }) {
  //   const modal = await this.modalController.create({
  //     component: AddRefillComponent,
  //     cssClass: 'fullscreen',
      // componentProps: {
      //   itemName: list.itemName,
      //   item: list
      // }
  //   });
  //   await modal.present();
  // }
  // async checkoutModal() {
  //   const modal = await this.modalController.create({
  //     component: BillingComponent,
  //     cssClass: 'fullscreen',
  //     componentProps: {
        // grandTotal: this.total - this.discount,
        // items: this.lists
  //     }
  //   });
  //   await modal.present();
  // }


}
