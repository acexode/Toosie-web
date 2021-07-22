import { Router } from '@angular/router';
import { InventoryService } from 'src/app/core/service/inventory/inventory.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  categories: any
  products: any
  min: any = 0;
  max: any = 0; 
  productPage = true
  productForm: FormGroup;
  hide = true;
  loading = false;
  files: File[] = [];
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: any = DataTableDirective;
  constructor(private invS: InventoryService, private fb: FormBuilder,
    private router: Router,
    ) {
      this.productForm = this.fb.group({
        category: ['', [Validators.required]],
        title: ['', [Validators.required] ],
        description: ['', [Validators.required ]],
        actualPrice: ['', [Validators.required ]],
        discountPercent: [0, [Validators.required, ]],
        tags: ['', [Validators.required, ]],
        brand: ['', [Validators.required, ]],
      });

     }
  ngOnInit(): void {
    const path = this.router.url
    if(this.router.url.includes('new')){
      this.productPage = false
    }else{
      this.productPage = true
    }
    console.log(path)
    $.fn.dataTable.ext.search.push((settings: any, data: string[], dataIndex: any) => {
      const id = parseFloat(data[0]) || 0; // use data for the id column
      return (Number.isNaN(this.min) && Number.isNaN(this.max)) ||
          (Number.isNaN(this.min) && id <= this.max) ||
          (this.min <= id && Number.isNaN(this.max)) ||
          (this.min <= id && id <= this.max);
    });
    this.invS.allCategories().subscribe((e:any) =>{
      this.categories = e.inventoryCategory
      const baby = this.categories[0]
      console.log(e)
      this.invS.inventoryByCategory(baby.id).subscribe((inv:any) =>{
        console.log(inv)
        this.products = inv.inventory
        this.dtTrigger.next();
      })
    })
  }
  filterById(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  ngOnDestroy(): void {

    $.fn.dataTable.ext.search.pop();
  }
  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  saveProduct(){
    this.loading = true
    var data = new FormData();
    data.append('category', '60c2269a3c3097745554235f');
    data.append('title', this.title?.value);
    data.append('description', this.description?.value);
    data.append('actualPrice', this.actualPrice?.value);
    data.append('discountPercent', '0');
    data.append('images', JSON.stringify(this.files));
    data.append('tags', this.tags?.value);
    data.append('brand', this.brand?.value);
    this.invS.createInventory(data).subscribe(inv =>{
      console.log(inv)
      this.loading = false;
      this.files = []
      this.productForm.reset()
    })
  }
  get title() {
    return this.productForm.get('title');
  }
  get category() {
    return this.productForm.get('category');
  }
  get description() {
    return this.productForm.get('description');
  }
  get actualPrice() {
    return this.productForm.get('actualPrice');
  }
  get discountPercent() {
    return this.productForm.get('discountPercent');
  }
  get images() {
    return this.productForm.get('images');
  }
  get tags() {
    return this.productForm.get('tags');
  }
  get brand() {
    return this.productForm.get('brand');
  }
}
