import { OrderService } from './../order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  id;
  order$;

  constructor(
    private route:ActivatedRoute,
    private orderService: OrderService
    ) 
    {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("Order id from URL"+ this.id);
   
    if(this.id) 
    {
      this.order$=
      this.orderService.viewMyOrder(this.id)
      //.subscribe(o => this.order$ =o) ;
      console.log(this.order$);
    }


  }

  ngOnInit() {
  }

}
