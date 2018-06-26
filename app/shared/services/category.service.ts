import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getData(){
    this.categories = this.firebase.list('categories');
    return this.categories;
  }
}
