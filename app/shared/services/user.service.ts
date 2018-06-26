import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppComponent } from '../../app.component';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userModel: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { 
    this.userModel = this.firebase.list('users');
  }

  save(user: firebase.User){ //create new user from google login.
    this.firebase.object('/users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }
  
  create(user: AppUser){ //create new user from sign in form.
    return this.userModel.push(user);

  }

  get(uid:string): Observable<any>{ //AngularFireObject <AppUser>
    return this.firebase.object('/users/'+uid).valueChanges();
  }

   
  update(id: string, user: AppUser){
    return this.userModel.update(id,user);
  }

  delete(id : string){
    this.userModel.remove(id);
  }



}
