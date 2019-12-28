import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  
 @Input('product') product: Product ;
 @Input('show-actions') showActions = true;
 @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
    }

//this has been moved to product-quantity.ts

  // removeFromCart(){
  //   this.cartService.removeFromCart(this.product);
  // }
  
//now implemented in shoppingCart.ts
  getQuantity() {
    if(!this.shoppingCart) return 0;

    let item = this.shoppingCart.itemsMap[this.product.key];
    console.log("item in product-card.ts"+item);
    return item ? item.quantity :0;
  }

}
