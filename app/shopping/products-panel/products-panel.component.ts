import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products-panel',
  templateUrl: './products-panel.component.html',
  styleUrls: ['./products-panel.component.css']
})
export class ProductsPanelComponent implements OnInit {
  @Input('category') category;
  categories: Category[];

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { 
    
  }

  ngOnInit() {
    //console.log('init in products-panel.');

    var x = this.categoryService.getData();
    x.snapshotChanges().subscribe(item => {
      this.categories = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['key'] = element.key;
        this.categories.push(y as Category); 
      });
      //console.log(this.categories);
    })
  }

}
