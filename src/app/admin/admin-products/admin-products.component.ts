import { ProductService } from './../../product.service';
import { AfterViewInit,Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
//import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
//import { DataTableResource } from '@angular/fire/database-deprecated';

// export interface Product {
//   key: string;
//   category: string;
//   imageUrl: string;
//   price: number;
//   title: string;    
// }

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit,OnInit, OnDestroy {
  //products$;
  //products: any[];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtInstance: DataTables.Api;
  //tableResource: DataTableResource<Product[]>;

  isDtInitialized:boolean = false
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) { 
   // dtInstanc
    //this.products= this.productService.getAll();
    
    // this.subscription= this.productService.getAll()
    // .subscribe(products => {
    //  const temp: any[] =products;
    //  this.filteredProducts= this.products = temp;
    // });
    
    //  this.dtTrigger.next();

  }

  private initializeTable(products: Product[]){
    
    if (this.isDtInitialized) { //to avoid the error of DataTable re-initialize. So destroy it and then initialize
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        // const temp: any[] =products;
        // this.filteredProducts= this.products = temp
        this.dtTrigger.next();
        console.log("NOT First time DataTable Initialized");
     });
    } else {
      this.isDtInitialized = true
     // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // const temp: any[] =products;
      // this.filteredProducts= this.products = temp
      this.dtTrigger.next();
      console.log("First time DataTable Initialized");
      //})
    }
  }


 filter(query: string){
   console.log(query);
   this.filteredProducts = (query) ?
     this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
     this.products;

     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // const temp: any[] =products;
      // this.filteredProducts= this.products = temp
 //     this.dtTrigger.next();
      console.log("NOT First time DataTable Initialized-filter");
   });
    //this.initializeTable(this.filteredProducts);
 }

 ngOnInit(){
  
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 8,
    search:false,
    //paging:false,
    searching:false,
    //tabIndex:7    
  };

  this.subscription= this.productService.getAll()
  .subscribe(products => {
   const temp: any[] =products;
   this.filteredProducts= this.products = temp;
   //this.dtTrigger.next();

   this.initializeTable(this.filteredProducts);
//    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
//     dtInstance.destroy();
//     const temp: any[] =products;
//     this.filteredProducts= this.products = temp
//     this.dtTrigger.next();
//     console.log("NOT First time DataTable Initialized");
//  });
  });
 }

 ngAfterViewInit(): void {
 // this.dtTrigger.next();
}

 ngOnDestroy() {
   this.subscription.unsubscribe();
   this.dtTrigger.unsubscribe();
 }
}
