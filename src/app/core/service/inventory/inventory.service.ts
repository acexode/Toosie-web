import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { roleEndpoints, inventoryEndpoints } from './../../config/endpoints';
import { RequestService } from './../../request/request.service';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  cartStore: BehaviorSubject<any> = new BehaviorSubject([]);
  popularStore: BehaviorSubject<any> = new BehaviorSubject([]);
  latestStore: BehaviorSubject<any> = new BehaviorSubject([]);
  loading: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor(private reqS: RequestService) {
    this.multipleRequest();
   }

  allCategories(){
    return this.reqS.get(inventoryEndpoints.allCategories);
  }
  allBrands(){
    return this.reqS.get(inventoryEndpoints.brands).pipe(map((data: any) => data.inventoryBrands));
  }
  multipleRequest(){
    const popular = this.reqS.get(inventoryEndpoints.popular +'/1');
    const latest = this.reqS.get(inventoryEndpoints.latest +'/1');
    forkJoin([popular, latest]).subscribe((results: any) =>{
      console.log(results);
      this.popularStore.next(results[0].inventory);
      this.latestStore.next(results[1].inventory);
    });
  }
  inventoryByCategory(id: string){
    return this.reqS.get(inventoryEndpoints.inventoryByCategory + id + '/1');
  }
  myOrders(){
    return this.reqS.get(inventoryEndpoints.myOrders + '1');
  }
  searchInventory(term: string | any[]){
    console.log(term.length);
    this.loading.next(true);
    return this.reqS.post(inventoryEndpoints.searchInventory, {searchText: term });
  }
  search(terms: Observable<string>){
    console.log(terms);
    return terms.pipe(debounceTime(1000),distinctUntilChanged(),
    switchMap(term => this.searchInventory(term)));
  }
  savePODCashOrder(obj: { records: any; paymentType: string; address: any; }){
    return this.reqS.post(inventoryEndpoints.savePODOrder, obj);
  }
  saveCardOrder(obj: { address: any; paymentType: string; records: any; txref: any; }){
    return this.reqS.post(inventoryEndpoints.saveCardOrder, obj);
  }
  saveTokenOrder(obj: any){
    return this.reqS.post(inventoryEndpoints.saveTokenOrder, obj);
  }
  createInventory(inv: any){
    return this.reqS.post(inventoryEndpoints.createInventory, inv)
  }
  createCategory(cat: any){
    return this.reqS.post(inventoryEndpoints.createCategory, cat)
  }

}
