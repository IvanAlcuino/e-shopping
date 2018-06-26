import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../shared/models/app-user';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user = {
    key: "",
    name: "",
    email: "",
    password: "",
    isAdmin: "",
    firstName: "",
    LastName: "",
    address: "",
  }
  error_message = "";

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  login(form){
    //console.log(JSON.stringify(form)); //return;
    this.auth.login(form.email,form.password).then(param => {
      console.log("result: " + param.code);
      let returnUrl  = this.route.snapshot.paramMap.get('returnUrl') || '/'; 
      this.router.navigateByUrl(returnUrl);
     
        
    }).catch(err => {
      if(err.code == "auth/wrong-password"){
        this.error_message = "Username or password is incorrect!";
      } 

    });
 

  }

  loginWithGoogle(){
    this.auth.loginWithGoogle();
  }

}
