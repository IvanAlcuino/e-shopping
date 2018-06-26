import { Injectable } from '@angular/core';
import { AppUser } from './shared/models/app-user';
 
@Injectable()
export class Global {
   pageState: string = 'listState'; //showState, editState, addState, listState
   listState: boolean = true;
   showState: boolean = true;
   addState: boolean = false;
   editState: boolean = false;

   user: AppUser = {
        key: '',
        email: '', 
        isAdmin: false,
        firstName: '',
        lastName: '',
        displayName: '',
        address: '', 
   }
}