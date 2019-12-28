import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
categories: AngularFireList<any[]>;
  constructor(private db: AngularFireDatabase) { }

  getAll(){
   // console.log("Inside getCategories");
    //return this.db.list('categories', ref => ref.orderByChild('name')).valueChanges();
    return this.db.list('categories', ref => ref.orderByChild('name'))  
    .snapshotChanges().pipe( //changed to read the key from firebase
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() as {}}))
      )
    );
  }
}
