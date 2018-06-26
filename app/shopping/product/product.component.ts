import { Component, OnInit  } from '@angular/core'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';  

import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { AppUser } from '../../shared/models/app-user';
import { AuthService } from '../../shared/services/auth.service';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Global } from '../../global';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: string; 
  product : Product;
  appUser: AppUser;
  
 

  constructor(private global: Global, private cartService: ShoppingCartService, private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {  
    //this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.appUser = this.global.user;

    this.product = {
      key: '',
      name: '',
      price: 0,
      category: '',
      imageUrl: '',
      desc: '',
      user_id: '',
    };

    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id'); 
         
        if(this.id){ 
            this.productService.getProduct(this.id).subscribe((item: any) => {
               
              this.product = item; 
              this.product['key'] = this.id;
            });
          
        }else{
          
        }

      }
      ); 
      
  }

  addToCart(product:Product){
    //console.log("addToCart.product"+JSON.stringify(product));
    //let cart = this.cartService.getOrCreateCart();
    this.cartService.addToCart(product); 
  }

  

}
