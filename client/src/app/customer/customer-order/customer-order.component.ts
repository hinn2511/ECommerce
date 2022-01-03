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
  tabActive = 0;

  predicates: {id: number; name: string, value: string}[] = [
    {id : -1, name: 'Tất cả', value: 'all'},
    {id : 0, name: 'chờ xác nhận', value: 'wfa'},
    {id : 1, name: 'đang chuẩn bị', value: 'preparing'},
    {id : 2, name: 'đang giao', value: 'delivering'},
    {id : 3, name: 'đã giao', value: 'delivered'},
    {id : 4, name: 'đã hủy', value: 'cancelled'}
  ];


  constructor(private orderService: OrderService, private router: Router) {
    this.orderService.resetOrderParams();
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


    
  selectPredicate(id: number) {
    let pre = this.predicates.find(p => p.id == id);
    this.orderParams.predicate = pre.value;
    this.loadOrders();
  }

  // selectTab(tabId: number) {
  //   this.tabActive = tabId;
  //   this.loadOrders();
  // }



  // getOrderDetail(orderId: number) {
  //   this.router.navigateByUrl('order-detail/' + orderId);
  // }

}
