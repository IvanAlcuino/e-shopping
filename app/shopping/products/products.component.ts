import { Component, OnInit  } from '@angular/core'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 

import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category: string; 
  products: Product[]; 
  
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {  
    this.route.paramMap.subscribe(
      params => {
        this.category = params.get('categoryName'); 
        
        if(this.category){ 
          let x = this.productService.getProductsByCategory(this.category);
          x.snapshotChanges().subscribe(item => {
            this.products = [];
            item.forEach(element => {
              let y = element.payload.toJSON();
              y['key'] = element.key;
              this.products.push(y as Product)
            })
            //console.log(this.category + ' ' + JSON.stringify(this.products));
          });
          
        }else{
          let x = this.productService.getAll();
          x.snapshotChanges().subscribe(item => {
            this.products = [];
            item.forEach(element => {
              let y = element.payload.toJSON();
              y['key'] = element.key;
              this.products.push(y as Product)
            })
          });
        }

      }
      ); 
  }
 
}
 