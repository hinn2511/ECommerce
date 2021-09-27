import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderDetail } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-customer-order-detail',
  templateUrl: './customer-order-detail.component.html',
  styleUrls: ['./customer-order-detail.component.css']
})
export class CustomerOrderDetailComponent implements OnInit {
  order: Order;
  quantity = 0;
  returnHome = false;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private toast: ToastrService) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.getLatestOrder(orderId);
    this.loadOrderDetail(orderId);
  }

  getLatestOrder(orderId: string) {
    const latestOrderId = localStorage.getItem('orderId');
    if (latestOrderId == orderId) {
      this.returnHome = true;
      localStorage.removeItem('orderId');
    }

  }

  loadOrderDetail(orderId: any) {
    this.orderService.getCustomerOrderDetail(orderId).subscribe(order => {
      this.order = order;
      this.order.orderDetails.forEach(element => {
        this.quantity = this.quantity + element.quantity;
      });
    })
  }

  cancelOrder(order: Order) {
    if (order.state == 1) {
      this.orderService.cancelOrderByCustomer(order.id).subscribe(result => {
        this.toast.success('Đã hủy đơn hàng thành công');
        this.loadOrderDetail(order.id);
      })
    }
  }
}
