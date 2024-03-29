import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderDetail } from 'src/app/_models/order';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-customer-order-detail',
  templateUrl: './customer-order-detail.component.html',
  styleUrls: ['./customer-order-detail.component.css']
})
export class CustomerOrderDetailComponent implements OnInit, OnDestroy {
  order: Order;

  constructor(private orderService: OrderService, 
    private route: ActivatedRoute, private confirmService: ConfirmService,
    private toast: ToastrService) { }
  
  ngOnDestroy(): void {
    localStorage.removeItem('orderId');
  }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.loadOrderDetail(orderId);
  }

  

  loadOrderDetail(orderId: any) {
    this.orderService.getCustomerOrderDetail(orderId).subscribe(order => {
      this.order = order;
    })
  }

  cancelOrder(order: Order) {
    if (order.state == 0) {
      this.confirmService.confirm('Xác nhận hủy đơn hàng', 'Bạn có chắc muốn hủy đơn hàng này không ?').subscribe(result => {
        if (result) {
          this.orderService.cancelOrderByCustomer(order.id).subscribe(result => {
            this.toast.success('Đã hủy đơn hàng thành công');
            this.orderService.clearCache();
            this.loadOrderDetail(order.id);
          });
        }
      });
    }
  }

}
