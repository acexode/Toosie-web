import { Component, OnInit } from '@angular/core';
import { AddRefillService } from 'src/app/core/service/add-refill/add-refill.service';
import { InventoryService } from 'src/app/core/service/inventory/inventory.service';

@Component({
  selector: 'app-auto-refill',
  templateUrl: './auto-refill.component.html',
  styleUrls: ['./auto-refill.component.scss']
})
export class AutoRefillComponent implements OnInit {

  orderList: any = [];
  refillList = [];
  constructor(private invS: InventoryService, private refillS: AddRefillService,
     ) { }

  ngOnInit() {
   this.loadRefill();
    this.invS.myOrders().subscribe((e: any) =>{
      console.log(e.receipts);
      e.receipts.map( (det: any) => this.orderList.push(...det.details));
      console.log(this.orderList);
    });
  }
  loadRefill(){
    this.refillS.refillListing().subscribe((obj: any) =>{
      console.log(obj.refill);
      this.refillList = obj.refill;
    });
  }
  removeRefill(id: any){
    const obj = {
      refillId: id
    };
    this.refillS.remove(obj).subscribe(e =>{
      this.loadRefill();
    });
  }
  async presentModal(list: { itemName: any; }) {
    // const modal = await this.modalController.create({
    //   component: AddRefillComponent,
    //   cssClass: 'fullscreen',
    //   componentProps: {
    //     itemName: list.itemName,
    //     item: list
    //   }
    // });
    // await modal.present();
  }

}
