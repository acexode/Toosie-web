/* eslint-disable no-underscore-dangle */
import { BehaviorSubject } from 'rxjs';
import { wishListEndpoints } from './../../config/endpoints';
import { RequestService } from './../../request/request.service';
import { Injectable } from '@angular/core';


const MY_CART = 'my_cart';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  cartStore: BehaviorSubject<any> = new BehaviorSubject([]);
  checkoutDetails: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(private reqS: RequestService) {
    const cart = JSON.parse(localStorage.getItem(MY_CART) || '{}');
    this.cartStore.next(cart);
  }
  async removeCart() {
    await localStorage.removeItem(MY_CART);
    this.cartStore.next([]);
  };

  async addItemToCart(item: any) {
    console.log(item)
    item.quantity = 1;
    const cart = localStorage.getItem(MY_CART);
    if (cart?.length) {
      const parseCart = JSON.parse(cart);
      // eslint-disable-next-line no-underscore-dangle
      const idx = parseCart.findIndex((e:any) => e._id === item._id);
      if(idx < 0){
        parseCart.push(item);
        this.cartStore.next(parseCart);
        localStorage.setItem(MY_CART, JSON.stringify(parseCart))
        return true;

      }else{
        return false;
      }
    } else {
      localStorage.setItem(MY_CART, JSON.stringify([item]))
      this.cartStore.next([item]);
      return true;
    }
  }
  async removeItemFromCart(item: any){
    const cart = localStorage.getItem(MY_CART);
    if (cart?.length) {
      const parseCart = JSON.parse(cart);
      // eslint-disable-next-line no-underscore-dangle
      const filt = parseCart.filter((e:any) => e._id !== item._id);
      this.cartStore.next(filt);
      localStorage.setItem(MY_CART, JSON.stringify([filt]))
    }
  }
  async incrementDecrement(item:any, type:string){
    const cart = localStorage.getItem(MY_CART);
    if(cart?.length){
      if(type === 'increment'){
        item.quantity = item.quantity + 1;
        const parseCart = JSON.parse(cart);
        const index = parseCart.findIndex((e:any) => e._id === item._id);
        parseCart[index] = item;
        this.cartStore.next(parseCart);
        localStorage.setItem(MY_CART, JSON.stringify([...parseCart]))
      }else{
        item.quantity = item.quantity < 1 ? 0 : item.quantity - 1;
        const parseCart = JSON.parse(cart);
        const index = parseCart.findIndex((e:any) => e._id === item._id);
        parseCart[index] = item;
        this.cartStore.next(parseCart);
        localStorage.setItem(MY_CART, JSON.stringify([...parseCart]))
      }
    }
  }
}
