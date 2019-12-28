//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class UserService {
appUsr:Observable<any>;
  constructor(private db: AngularFireDatabase) {     
     }

     save(user:firebase.User){
        this.db.object('/users/' + user.uid).update({
          name : user.displayName,
          email : user.email
        });
     }

     get(uid: string):AngularFireObject<AppUser> {
         return this.db.object('/users/' + uid);//.valueChanges()
        //  .subscribe(x =>{
        //   console.log(x);
        //  });
         
     }
}
