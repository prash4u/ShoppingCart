import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oshop';
  constructor(private userService:UserService,private auth: AuthService, private route: Router){
    auth.user$.subscribe(user =>{
      if(!user) return;    

        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl) return;
          localStorage.removeItem('returnUrl');
          return this.route.navigateByUrl(returnUrl);//as AppComponent is Root component, so whenever the returnUrl have
                        // value it will navigate to that URL

        
        
      
    })
  }
}
