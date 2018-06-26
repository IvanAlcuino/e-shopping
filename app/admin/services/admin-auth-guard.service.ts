import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { map, switchMap, throttle } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor (private auth: AuthService, private userService: UserService)  { }

  canActivate():Observable<boolean>{
    return this.auth.user$
      .pipe(switchMap((user:any) => this.userService.get(user.uid)), map((appUser :any) => appUser.isAdmin));
    // return this.auth.user$ 
    // .map((appUser :any) => appUser.isAdmin);
  }

   

  
}
