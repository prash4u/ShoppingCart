//import { userInfo } from 'os';
//import { Observable } from 'rxjs/Observable';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{
appUsr:AppUser;
  constructor(private auth: AuthService, private userService:UserService) { }

  canActivate():Observable<boolean>{
    //  return this.auth.user$                                                      //moved to AuthService
    //  .pipe(switchMap( user => this.userService.get(user.uid).valueChanges()))

    return this.auth.appUser$    //Calling AuthService
     .pipe(map(usr => {
    //  this.appUsr{}=usr//.isAdmin ;//= usr;
      console.log(usr.isAdmin);
      if(usr.isAdmin) return true;
      else return false;
     }));

  
    
    //}.add()
    //.map((x) => console.log(x));
  }
}
//    return  this.auth.user$.pipe(map(user =>{