import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderDetail } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-customer-order-detail',
  templateUrl: './customer-order-detail.component.html',
  styleUrls: ['./customer-order-detail.component.css']
})
export class CustomerOrderDetailComponent implements OnInit, OnDestroy {
  order: Order;
  quantity = 0;
  returnHome = false;
  latestOrderId = localStorage.getItem('orderId');

  constructor(private orderService: OrderService, 
    private route: ActivatedRoute, private router: Router, 
    private toast: ToastrService) { }
  
  ngOnDestroy(): void {
    localStorage.removeItem('orderId');
  }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.getLatestOrder(orderId);
    this.loadOrderDetail(orderId);
  }

  

  getLatestOrder(orderId: string) {
    if (this.latestOrderId == orderId) {
      this.returnHome = true;
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
    if (order.state == 0) {
      this.orderService.cancelOrderByCustomer(order.id).subscribe(result => {
        this.toast.success('Đã hủy đơn hàng thành công');
        this.quantity = 0;
        this.orderService.clearCache();
        this.loadOrderDetail(order.id);
      })
    }
  }

  returnToOrderList () {
    this.router.navigateByUrl('/order');
  }
}
