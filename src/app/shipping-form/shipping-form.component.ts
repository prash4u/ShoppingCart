import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../models/order';
import { ShoppingCartService } from '../shopping-cart.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart:ShoppingCart;
  shipping:any={};//:any[]=[];// {}; 
  userId: string;
  //cart: ShoppingCart;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
    ) { }

  async placeOrder() {
    console.log(this.shipping);
    let order = new Order(this.userId, this.shipping, this.cart);
    console.log(order);

   let result = await this.orderService.placeOrder(order);   
   this.router.navigate(['/order-success', result.key]);
  }
  
   ngOnInit() {
    // const cart$ = await this.shoppingCartService.getCart();
    // this.cartSubscription = cart$.subscribe(cart => {
    //   let temp: any;
    //   temp = cart.payload.child('/items').val();
    //   this.cart = new ShoppingCart(temp);
    this.userSubscription= this.authService.user$.subscribe(user => this.userId = user.uid);  
  };

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

    
  

}
