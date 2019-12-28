import { AngularFireDatabase } from '@angular/fire/database';
//import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { 
    
    }
    create(product){
      this.db.list('/products').push(product);
  }

  getAll(){
    //return this.db.list('/products').valueChanges();
    return this.db.list('/products')
    .snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() as {}}))
      )
    );
  }

  get(productId){
      return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product){
    console.log(product);
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
}
}
