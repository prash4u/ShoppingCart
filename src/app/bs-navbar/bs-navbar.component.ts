import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
//import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
//import * as firebase from 'firebase';
//import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
//user$ :Observable<firebase.User>; //moved to AuthService

appUsr:AppUser;
shoppingCartItemCount: number;
collapsed = true;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 
    //this.user$=afAuth.authState;//.subscribe(user => this.user=user);
    //since the firbase object doesn't unsubscribe automatically so explicitly we need to add async pipe

    //ASYNC PIPE- SWITCH MAP (Infinite Loop causing the entire URL tree to keep reloading due to change detection
    auth.appUser$.subscribe((appUsr) =>{
      this.appUsr = appUsr;
      console.log(appUsr);
    }) ;
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe((appUsr) =>{
      this.appUsr = appUsr;
      console.log(appUsr);
      
    }) ;

    let cart$ = 
    await this.shoppingCartService.getCart();
    cart$.subscribe(temp =>{
    let data: any;
    data = temp.payload.child('/items').val();
    let cart = new ShoppingCart(data);
    this.shoppingCartItemCount = cart.totalItemsCount;
    })
      
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  
  logout() {
    //this.afAuth.auth.signOut();    //move this logic to AuthService
    this.auth.logout(); //being called from AuthService
  }

}
