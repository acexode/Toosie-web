import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/service/inventory/inventory.service';
import { OrdersService } from 'src/app/core/service/orders/orders.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  categories =  [
    {
      category: 'Baby & Child',
      id: 1
    },
    {
      category: 'Women Care',
      id: 2
    },
    {
      category: 'Men Care',
      id: 3
    },
    {
      category: 'Vitamins',
      id: 4
    },
    {
      category: 'Hair Care',
      id: 5
    },
    {
      category: 'Skin Care',
      id: 6
    },
    {
      category: 'Oral Care',
      id: 7
    },
    {
      category: 'Organic Products',
      id: 8
    },
    {
      category: 'Medical Supplies',
      id: 9
    }
  ];
  products =  [];
 loading = false;
  tab = this.categories[0].id;
  constructor(private inventoryS: InventoryService,
    private orderS: OrdersService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loadCategory();
  }
  loadCategory(){
    this.inventoryS.allCategories().subscribe((e: any) =>{
      console.log(e);
      this.categories = e.inventoryCategory;
      this.tab = this.categories[0].id;
      this.loadInventory(this.tab);
    });
  }
  loadInventory(id: any){
    this.loading = true;
    this.inventoryS.inventoryByCategory(id).subscribe((e: any) =>{
      console.log(e);
      this.loading = false;
      this.products = e.inventory;
    });
  }
  addToCart(id: string){
    this.orderS.addItemToCart(id).then(e =>{
      if(e){
        //this.presentToast('item added to cart');
      }else{
       // this.presentToast('item already in cart');
      }

    });
  }
  navigate(q: any){
    this.router.navigate(['home/shop', {category: q}]);
  }
 

  back(){
    // this._location.back();
  }
 

}
