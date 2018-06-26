import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-Shopping';

  constructor(private userService: UserService, private auth:AuthService, router: Router){
    if(!auth.user$) return;
    auth.user$.subscribe(user => {
      if(!user) return;
      
        userService.save(user);

        //let returnUrl = localStorage.getItem('returnUrl');
        //if(!returnUrl) return;
        //just use it after login to google and then remove it so that after every refresh the user doesn't need to redirect to home. on redirect if after refresh.
        //localStorage.removeItem('returnUrl');
        //router.navigateByUrl(returnUrl);
          
 
    })
  }
  // constructor(private userService: UserService, private auth:AuthService, router: Router){
  //   if(!auth.user$) return;
  //   auth.user$.subscribe(user => {
  //     if(!user) return;
      
  //       userService.save(user);
  //     })
  //   }

        // let returnUrl = localStorage.getItem('returnUrl');
        // if(!returnUrl) return;
        // //just use it after login to google and then remove it so that after every refresh the user doesn't need to redirect to home. on redirect if after refresh.
        // localStorage.removeItem('returnUrl');
        // router.navigateByUrl(returnUrl);
         
  

}

