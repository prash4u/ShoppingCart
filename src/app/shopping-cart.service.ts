
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }



  //   async getCart(): Promise<Observable<ShoppingCart>> {
  //   const cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
  //     map(x => new ShoppingCart(x.payload))
  //   );
  // }
 async getCart() {
   let cartId = await this.getOrCreateCartId();
  return this.db.object('/shopping-carts/' + cartId)
  .snapshotChanges();
  // .pipe( //changed to read the key from firebase
  //   map(actions => 
  //     actions.map(a => ({ key: a.key, ...a.payload.val() as {}}))
  //   )
  // );
}

async addToCart(product: Product){
  this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

async clearCart(){
  let cartId =await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items/').remove();
}

private getItem(cartId: string, productId: string){
  return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}


private create(){
  return this.db.list('/shopping-carts').push({
    dateCreated: new Date().getTime()
  })
}

 private async getOrCreateCartId(): Promise<string>{ //not required Promise<string> in Angular 8 as it is implicitly converted
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      console.log("New Cart ID create");
      let result = await this.create();
      localStorage.setItem('cartId',result.key);

      // this.create().then(result =>{   //Need to refractor this code to make this async operations like synchronous
      //   localStorage.setItem('cartId',result.key);
        
       return result.key;
        //Add product to Cart    
    } 
      console.log("Existing Cart ID available");    
    //Add product to Cart
    return cartId;  
  }



  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.key);
    
    item$.snapshotChanges()
    .pipe(take(1))
    .subscribe(data =>{
      let quantity = (data.payload.child('/quantity').val() || 0) + change;
      if(quantity === 0) {item$.remove();}
      else {
       // if(data.payload.exists()){    // this commented code has been refactored as below item$.update
      //   item$.update({quantity: data.payload.child('/quantity').val() + 1})
      // } else {
      //   item$.set({product : product, quantity:1});
      // }
        item$.update({product: product, quantity:(data.payload.child('/quantity').val() || 0) + change});
        }
    });
  }


}
