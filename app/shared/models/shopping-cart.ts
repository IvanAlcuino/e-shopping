import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart{ 
    items: ShoppingCartItem[] = [];

    //constructor(public items: ShoppingCartItem[]){
    constructor(private itemsObj: {[poductId: string]: ShoppingCartItem}){  
      //console.log(" constructor itemsObj: "+JSON.stringify(itemsObj));
      this.itemsObj = itemsObj || {};
      for(let productId in itemsObj){
        //this.items.push(itemsObj[productId]);
        let item = itemsObj[productId];
        this.items.push(new ShoppingCartItem({...item,key:productId}));
        //Object.assign(x, item);
        //x.key = productId;
        //this.items.push(x);
        //this.items.push(new ShoppingCartItem(item.product, item.quantity));

      }
      //console.log(" items: "+JSON.stringify(this.items));
      

    }

    getQuantity(product: Product){  
      //console.log("getQuantity->product.stringify:" + JSON.stringify(product));
      //console.log("itemsObj:" + JSON.stringify(this.itemsObj));
      let item = this.itemsObj[product.key];
      //console.log("getQuantity.item:" + JSON.stringify(item));
      //console.log("getQuantity:" + item ? item.quantity : null);
      return (item) ? item.quantity : 0;
    }

    get productIds(){
      // let ids = [];
      // for(let productId in this.items){ 
      //   ids.push(this.items[productId].product.key);
      // }
      // return ids;
      return Object.keys(this.items);
    }
    
    get totalItemsCount(){  
      let count = 0;
      for(let productId in this.items){
        count += this.items[productId].quantity; 
        //console.log("items[productId]: "+ JSON.stringify(this.items[productId]));
      }
      //console.log("shoppingCart.count: "+count);
      return count;
    }

    get totalPrice(){
      let sum = 0;
      let itemsIds = Object.keys(this.items);
      for(let productId in itemsIds){
        sum += this.items[productId].price;
        //console.log("price: "+this.items[productId].product.price);
      }
      //console.log("sum: "+sum);
      return sum;

    }

    

}