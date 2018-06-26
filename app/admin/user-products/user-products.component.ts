import { Component, OnInit  } from '@angular/core'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 

import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { AuthService } from '../../shared/services/auth.service';
import { AppUser } from '../../shared/models/app-user';

@Component({
  selector: 'user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {
  appUser: AppUser
  products: Product[];

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;

      let x = this.productService.getProductsByUserId(this.appUser.key);
          x.snapshotChanges().subscribe(item => {
            this.products = [];

            console.log("items: "+JSON.stringify(item));
            if(item.length<1) return;
            
            item.forEach(element => {
              let y = element.payload.toJSON();
              y['key'] = element.key;
              this.products.push(y as Product)
            });

            console.log("Products: "+JSON.stringify(this.products));
          });

    });

    

  }

}
