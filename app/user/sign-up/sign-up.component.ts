import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../../shared/models/app-user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/services/user.service' 
import { AuthService } from '../../shared/services/auth.service';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  constructor(private auth:AuthService, private userService: UserService, private router: Router ) { }

  ngOnInit() {
  }

  save(form){  

    this.auth.createUserWithEmailPassword(form.email,form.password).then(param =>{
      //console.log("registration result: "+ JSON.stringify(param));
      //form.controls['password'].setValue(password)
      let user:AppUser = {
        key: param.user.uid,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        isAdmin: false,
        displayName: form.firstName + ' ' + form.lastName,
        address: '',
      };
      console.log("user:" + JSON.stringify(user)); 
      this.userService.update(param.user.uid, user).then((item) => {  
        console.log("updated user info.."); 
        //console.log("item: " + JSON.stringify(item)); 
        this.router.navigate(['/user/'+param.user.uid]);
        //this.auth.login(form.email, form.password, '/user/'+param.user.uid);
      });

    });

    
 
    
  }
 

  resetForm(userForm?: NgForm){
    if(userForm != null)
      userForm.reset(); 
  }

}
