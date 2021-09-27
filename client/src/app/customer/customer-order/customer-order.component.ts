import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/_models/order';
import { OrderParams } from 'src/app/_models/orderParams';
import { Pagination } from 'src/app/_models/pagination';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {
  orderParams: OrderParams;
  orderList: Order[];
  pagination: Pagination;
  tabActive = 1;


  constructor(private orderService: OrderService, private router: Router) { 
    this.orderParams = this.orderService.getOrderParams();
   }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.setOrderParams(this.orderParams);
    this.orderService.getCustomerOrders(this.orderParams).subscribe(response => {
      this.orderList = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    if (this.orderParams.pageNumber !== event.page) {
      this.orderParams.pageNumber = event.page;
      this.orderService.setOrderParams(this.orderParams);
      this.loadOrders();
    }
  }

  selectPredicate(type: number) {
    switch (type) {
      case 1: {
        this.selectTab(1);
        break;
      } 
      case 2: {
        this.selectTab(2);
        break;
      } 
      case 3: {
        this.selectTab(3);
        break;
      } 
      case 4: {
        this.selectTab(4);
        break;
      }
    }
    
  }

  selectTab(tabId: number) {
    this.tabActive = tabId;
    this.loadOrders();
  }

  getOrderDetail(orderId: number) {
    this.router.navigateByUrl('order-detail/' + orderId);
  }

}
