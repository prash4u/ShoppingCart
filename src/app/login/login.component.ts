import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
//import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //constructor(private afAuth: AngularFireAuth) { //no longer to inject AngularFireAuth as this logic is moved to AuthService
    constructor(private auth: AuthService) {
    
   }

  login(){
    //this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()); //login with Google OAuth() 
    //move the above logic to auth.service.ts to make it unit testable and separation of concerns

    this.auth.login(); //calling the login() from AuthService
  }

}
