import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  subscription: Subscription;
  categories$:any[];
@Input('categor') category;

  constructor(private categoryService: CategoryService) { 

    this.subscription = categoryService.getAll() //this getAll method implementation is change to read "key" in .html
    .subscribe(cat => {
     const temp: any[] =cat;
      this.categories$ = temp;
    });

  }

  ngOnInit() {
  }

}
