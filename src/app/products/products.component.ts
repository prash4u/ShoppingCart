import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from './../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products: Product[] =[];
 //categories$:any[]; //moved the categories logic to product-filter component-- So all filteration logic at 1 place
 subscription: Subscription;
 subscription1: Subscription;
 cart: ShoppingCart;
 category: string;
 filteredProducts: any[] =[];

 constructor(
   productService: ProductService,
   route: ActivatedRoute,
   private shoppingCartService: ShoppingCartService) { 

  this.subscription1= productService.getAll()
  .subscribe(products => {
   const temp: any[] =products;
   this.filteredProducts= this.products = temp;
   console.log("this.filteredProducts1- "+ this.filteredProducts)      ;

   //this multiple subscribe observable can be combined using SwitchMap
          route.queryParamMap.subscribe(params => {
            this.category = params.get('category');
            console.log(this.category);

            this.filteredProducts = (this.category) ?
              this.products.filter(p => p.category === this.category) :
              this.products;
              console.log("this.filteredProducts2- "+ this.filteredProducts)      ;
          });

   
  });
 // this.products=  productService.getAll();//.subscribe(products => this.products = products)
      

        

     
  }

   async ngOnInit() {
    //  await (await this.shoppingCartService.getCart())
    //  .subscribe(cart => this.cart = cart);

    this.subscription = (await this.shoppingCartService.getCart())
    .subscribe(cart => {
      let temp: any;
      temp = cart.payload.child('/items').val();
      this.cart = new ShoppingCart(temp);

     // this.cart = temp;
      console.log("temp value in products.component.ts -"+temp);
      console.log(this.cart);
  });
  }
}

