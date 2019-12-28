import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ :Observable<firebase.User>; 
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.user$=afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; //so either go back to what returnUrl 
    //returns or the HomePage('/')
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()); //login with Google OAuth() 
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
     .pipe(switchMap( user => {
      if(user) return this.userService.get(user.uid).valueChanges();
       
      return of(null); //Observable.of is deprecated, now "of" has been replaced by function in Rxjs 
     }))
  }
}
