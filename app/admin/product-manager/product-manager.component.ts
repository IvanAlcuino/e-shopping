import { Component, OnInit } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';

import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { Category } from '../../shared/models/category.model';
import { AuthService } from '../../shared/services/auth.service';
import { AppUser } from '../../shared/models/app-user';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {
  categories: Category[];
  product = {
    key: '',
    name: '',
    price: '',
    category: '',
    imageUrl: '',
    desc: ''
  };
  id;
  user_id = 1; 
  appUser: AppUser;

  constructor(private auth: AuthService, private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
     

    var x = this.categoryService.getData();
    x.snapshotChanges().subscribe(item => {
      this.categories = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['key'] = element.key;
        this.categories.push(y as Category); 
      });
     
    })
 
    
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');  
        if(this.id){ 
            this.productService.getProduct(this.id).subscribe((item:any) => { 
              this.product = item; 
              this.product['key'] = this.id;
            }); 
        }else{
          this.id = 0;
          this.product = {
            key: '',
            name: '',
            price: '',
            category: '',
            imageUrl: '',
            desc: ''
          };
        } 
      }
      ); 

  }

  save(product){ 
    //console.log(this.id + ' ' + JSON.stringify(product) );
    //return;
    if(this.id){
      this.productService.update(this.id, product);
    }else{
      //console.log('saving..');
      let result = this.productService.create(product);
      //console.log(result);
    }

    
    this.router.navigate(['/user/'+this.user_id]);
  }

  delete(){
    if(!confirm('Are you sure to delete this product?')) return;
     
    this.productService.delete(this.id);
    this.router.navigate(['/user/'+this.user_id]);
     
  }

}
