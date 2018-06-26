import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product.model';
 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productModel: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.productModel = this.firebase.list('products');
   }

  getAll(){
    
    return this.productModel;
  }

  getProduct(id: string){
    return this.firebase.object('/products/'+id).valueChanges();
  }

  getProductsByCategory(category: string){ 
    return this.firebase.list('products', ref => ref.orderByChild('category').equalTo(category));
  }

  getProductsByUserId(user_id){ 
    return this.firebase.list('products', ref => ref.orderByChild('user_id').equalTo(user_id));
  }

  create(product: Product){
    this.productModel.push({
      name: product.name,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      desc: product.desc
    });

  }

  update(id: string, product: Product){
    this.productModel.update(id,{
      name: product.name,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      desc: product.desc
    });
  }

  delete(key : string){
    this.productModel.remove(key);
  }


}
