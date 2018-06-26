import { Injectable } from '@angular/core'; 
import { AngularFireAuth } from 'angularfire2/auth'; 
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { map, switchMap, throttle} from 'rxjs/operators';
import { of } from 'rxjs';
import { AppUser } from '../../shared/models/app-user'; 
//import { map, switchMap, throttle } from 'rxjs/add/operator/switchMap'

@Injectable()
export class AuthService {
  user$: Observable<firebase.User> = null;
  _isLogin = false;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService, private router: Router) {  
    //console.log("init 1");
    this.user$ = afAuth.authState; 
    //console.log("init 2");
  }

  loginWithGoogle(){ 
    let returnUrl  = this.route.snapshot.paramMap.get('returnUrl') || '/';
    
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(param => {
        //console.log("login successful. param:"+param);
      //  console.log('signInWithPopup: Nice, it worked!');
      //console.log("auth:"+JSON.stringify(this.afAuth.auth));
     // console.log("user:"+JSON.stringify(this.appUser$));
      this.router.navigateByUrl(returnUrl); 
      });
     
  }

  login(email: string, password: string, redirect?:string){ //:Observable<boolean>
    // let returnUrl = '/';
    // if(redirect){
    //   returnUrl = redirect;
    // }else{
    //   returnUrl  = this.route.snapshot.paramMap.get('returnUrl') || '/';
    // }
     
    //console.log("email: "+email+ " password:"+password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    // .then(value => {
    //   //console.log('Nice, it worked!');
    //   //console.log("auth:"+JSON.stringify(this.afAuth.auth));
    //   //console.log("user:"+JSON.stringify(this.appUser$));
    //   this.router.navigateByUrl(returnUrl); 
       
    // })
    // .catch(err => {
    //   console.log('Something went wrong:',err.message);
    //   return of(false);
    // });

    // console.log("");
    // return;
    // .then(param =>{
    //   console.log(JSON.stringify(param));
    //   this.router.navigateByUrl(returnUrl); 
    // });
  }

  logout(){
    this.afAuth.auth.signOut();
    this._isLogin = false;
  }

  createUserWithEmailPassword(email, password){
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email,password);
  }

  get appUser$():Observable<any>{
    if(!this.user$) return;
    return this.user$.pipe(switchMap((user:any) => {
        //console.log("getting user:"+JSON.stringify(user));
        if(user) return this.userService.get(user.uid);
        
        return  of(null);
      }));
  }

  get isLogin(){
    return this._isLogin;
  }
}
