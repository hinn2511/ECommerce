import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/_models/cartItem';
import { PaymentMethod, ShippingMethod } from 'src/app/_models/order';
import { Pagination } from 'src/app/_models/pagination';
import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { ShippingService } from 'src/app/_services/shipping.service';
import { FormValidationRegex } from 'src/app/_validations/form-validation';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  carts: CartItem[] = [];
  shippingMethods: ShippingMethod[] = [];
  paymentMethods: PaymentMethod[] = [];
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  quantity: number;
  subTotal: number;
  discount: number = 0;
  checkoutForm: FormGroup;
  regex = FormValidationRegex;
  model: any = {};
  shippingDropdown = false;
  paymentDropdown = false;

  constructor(private cartService: CartService, private formBuilder: FormBuilder,
     private orderService: OrderService, private toastr: ToastrService,
     private promotionService: PromotionService, private shippingService: ShippingService,
     private paymentService: PaymentService, private route: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPaymentMethod();
    this.loadShipingMethod();
    this.loadCustomerOrder();
  }

  initializeForm() {
    this.checkoutForm = this.formBuilder.group({
      destination: ['', [Validators.required, Validators.pattern(this.regex.address)]],
      fullName: ['', [Validators.required, Validators.pattern(this.regex.string)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.regex.phoneNumber)]],
    })
  }

  loadCustomerOrder() {
    this.cartService.getAllCustomerCart().subscribe(response => {
      this.carts = response;
      this.subTotal = 0;
      this.quantity = 0;
      for (let item of response) {
        this.subTotal = this.subTotal + item.price * item.quantity;
        this.quantity = this.quantity + item.quantity;
      }
    })
  }

  redeemPromotion() {
    this.promotionService.redeemPromotionCode(this.model.promotionCode).subscribe(result => {
      this.discount = result.discount;
      this.model.promotionId = result.id;
      this.toastr.success('Đã áp dụng mã giảm giá thành công');
    }, error => {
      this.model.promotionId = null;
      this.discount = 0;
    });
  }

  order() {
    this.model.fullName = this.checkoutForm.controls.fullName.value;
    this.model.destination = this.checkoutForm.controls.destination.value;
    this.model.phoneNumber = this.checkoutForm.controls.phoneNumber.value;
    this.orderService.checkout(this.model).subscribe(result => {
      this.toastr.success('Đặt hàng thành công');
      this.route.navigateByUrl('order-detail/' + result.id);
      localStorage.setItem('orderId', result.id.toString());
      this.orderService.clearCache();
    }, error => {
      this.toastr.error('Đã có lỗi xảy ra trong quá trình đặt hàng');
    })
  }

  loadShipingMethod() {
    this.shippingService.getAllShippingMethods().subscribe(sm => {
      this.shippingMethods = sm;
      this.shippingMethod = sm.find(x => x.state);
      this.model.shippingMethodId = this.shippingMethod.id;
    })
  }

  chooseShippingMethod(shippingMethod: ShippingMethod) {
    if (shippingMethod.state) {
      this.shippingMethod = shippingMethod;
      this.model.shippingMethodId = shippingMethod.id;
    }
  }

  loadPaymentMethod() {
    this.paymentService.getAllPaymentMethods().subscribe(pm => {
      this.paymentMethods = pm;
      this.paymentMethod = pm.find(x => x.state);
      this.model.paymentMethodId = this.paymentMethod.id;
    })
  }

  choosePaymentMethod(paymentMethod: PaymentMethod) {
    if (paymentMethod.state) {
      this.paymentMethod = paymentMethod;
      this.model.paymentMethodId = paymentMethod.id;
    }
  }

  dropDownClose(option: string) {
    if (option == 'shipping') {
      this.shippingDropdown = false;
      this.paymentDropdown = true;
    }
    if (option == 'payment') {
      this.shippingDropdown = true;
      this.paymentDropdown = false;
    }
  }


}
