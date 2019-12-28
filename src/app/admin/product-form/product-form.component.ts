import { ProductService } from './../../product.service';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$//
  product ={}; //initially set it to BLANK object
  id;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) { 

    this.categories$=  categoryService.getAll();
    
    this.id = this.route.snapshot.paramMap.get('id'); //this will read the id of the products coming from db, id--LwcvPcNleUmuC6rgkrU
              //like http://localhost:4200/admin/products/-LwcvPcNleUmuC6rgkrU

    if(this.id) this.productService.get(this.id).subscribe(p => this.product =p) ;

    //.snapshotChanges()
    // .forEach(categoriesSnap =>{
    //   categoriesSnap.forEach(catSnap =>{
    //     this.categories$=catSnap.payload.toJSON;
    //      this.categories$['$key']=catSnap.key;
    //      console.log(this.categories$['$key']);
    //   })
    // });
    // .pipe(list => this.categories$=list);
    // console.log(this.categories$);
    
  }

  save(product) {
    console.log("Inside save");
    if(this.id) this.productService.update(this.id,product); //if that id is already present in db then instead of saving update it
    //console.log(product); //checked the Json objects are coming properly
   else {this.productService.create(product);
   console.log("Product"+product);
  }

    this.router.navigate(['/admin/products']);
    
  }

  delete(){
    if(!confirm('Are you sure to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

  ngOnInit() {
  }

}
