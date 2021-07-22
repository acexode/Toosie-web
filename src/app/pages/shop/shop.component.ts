import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/service/inventory/inventory.service';
import { OrdersService } from 'src/app/core/service/orders/orders.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

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
  products :any[]=  [];
  fakeproducts :any[]=  [1,2,3,4,5,6];
 loading = false;
  tab = this.categories[0].id;
  constructor(private inventoryS: InventoryService,
    private orderS: OrdersService,
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
    console.log(id)
    this.loading = true;
    this.inventoryS.inventoryByCategory(id).subscribe((e: any) =>{
      console.log(e);
      this.loading = false;
      this.products = e.inventory;
    });
  }
  addToCart(p: object){
    this.orderS.addItemToCart(p).then(e =>{
      if(e){
        //this.presentToast('item added to cart');
      }else{
       // this.presentToast('item already in cart');
      }

    });
  }
 

}
