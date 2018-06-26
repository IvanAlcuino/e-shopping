import { Component, OnInit, Input } from '@angular/core';

import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { log } from 'util';
import { resolveDirective } from '@angular/core/src/render3/instructions';
import { Router } from '@angular/router'; 

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product:Product;
  @Input('optionVisible') optionVisible:boolean;
  

  constructor(private router: Router) { }

  ngOnInit() {

  }

  navigateProduct(key:string){ 
    //this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    //console.log(key);
    this.router.navigate(['/product/'+key]);
  }

}
