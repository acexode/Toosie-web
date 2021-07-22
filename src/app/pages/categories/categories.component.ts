import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { InventoryService } from 'src/app/core/service/inventory/inventory.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

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
        title: ['', [Validators.required]],
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
    data.append('category', this.title?.value);
    data.append('categoryImage', JSON.stringify(this.files));
    this.invS.createCategory(data).subscribe(inv =>{
      console.log(inv)
      this.loading = false;
      this.files = []
      this.productForm.reset()
    })
  }
  get title() {
    return this.productForm.get('title');
  }
 
  get brand() {
    return this.productForm.get('brand');
  }
}