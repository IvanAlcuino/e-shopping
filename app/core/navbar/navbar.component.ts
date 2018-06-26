import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../../shared/services/auth.service';
import { AppUser } from '../../shared/models/app-user';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Global } from '../../global';
 

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  //shoppingCartItemCount=0;

  //constructor(){}
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService, private global: Global) {  
    //console.log(auth.appUser$);
    //if(auth.isLogin==false) return; 
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      this.global.user = this.appUser;
    });
    //this.cart$ = await this.shoppingCartService.getCart();
    
    //this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    //console.log(JSON.stringify(this.auth));
    //this.cart$ = await this.shoppingCartService.getCart();
 
    
  }

  logout(){
   this.auth.logout();
  }

}
