// import { AuthService } from './../auth.service';
// import { OrderService } from './../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
// import { map } from 'rxjs/operators';
// import { Order } from '../models/order';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy { 
  shipping = {}; 
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

constructor(
    // private router: Router,
    // private authService: AuthService,
    // private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => {
      let temp: any;
      temp = cart.payload.child('/items').val();
      this.cart = new ShoppingCart(temp);
    });

   // this.userSubscription= this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  //moved to shipping-form.ts

//  async placeOrder() {
//     console.log(this.shipping);
//     let order = new Order(this.userId, this.shipping, this.cart);
//     console.log(order);

//    let result = await this.orderService.placeOrder(order);   
//    this.router.navigate(['/order-success', result.key]);



    //moved to order.ts
    // let order ={
    //   userId: this.userId,
    //   datePlaced: new Date().getTime(),
    //   shipping : this.shipping,
    //   items : this.cart.items.map(i => {
    //     return{
    //       product :{
    //         title: i.product.title,
    //         imageUrl: i.product.imageUrl,
    //             price: i.product.price
    //           },
    //           quantity: i.quantity,
    //           totalPrice: i.totalPrice
    //     }
    //   })
    //}
   
  //}  
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    //this.userSubscription.unsubscribe();
  }

}
