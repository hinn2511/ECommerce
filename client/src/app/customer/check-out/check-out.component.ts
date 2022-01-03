import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/_models/cartItem';
import { PaymentMethod, ShippingMethod } from 'src/app/_models/order';
import { Pagination } from 'src/app/_models/pagination';
import { RedeemResult } from 'src/app/_models/redeemResult';
import { CartService } from 'src/app/_services/cart.service';
import { addDays, getMonthFromString } from 'src/app/_services/helper';
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
  checkoutForm: FormGroup;
  regex = FormValidationRegex;
  
  carts: CartItem[] = [];
  shippingMethods: ShippingMethod[] = [];
  paymentMethods: PaymentMethod[] = [];

  chosenShippingMethod: ShippingMethod;
  chosenPaymentMethod: PaymentMethod;

  subTotal: number;

  redeemResult: RedeemResult = {
    id: null, 
    discount: 0,
    promotionCode: ''
  };

  orderInformation: any = {};

  stage = '';

  constructor(private cartService: CartService, private formBuilder: FormBuilder,
    private orderService: OrderService, private toastr: ToastrService,
    private promotionService: PromotionService, private shippingService: ShippingService,
    private paymentService: PaymentService, private route: Router) { }

  ngOnInit(): void {
    this.stage = 'info';
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
      email: ['', [Validators.pattern(this.regex.email)]],
    })
  }

  loadCustomerOrder() {
    this.cartService.getAllCustomerCart().subscribe(response => {
      this.carts = response;
      this.subTotal = 0;
      for (let item of response) {
        this.subTotal = this.subTotal + item.price * item.quantity;
      }
    })
  }

  redeemPromotion() {
    this.promotionService.redeemPromotionCode(this.orderInformation.promotionCode).subscribe(result => {
      this.redeemResult = result;
      this.orderInformation.promotionId = result.id;
      this.toastr.success('Đã áp dụng mã giảm giá thành công');
    }, error => {
      this.orderInformation.promotionId = null;
      this.clearRedeemResult()
    });
  }

  removePromotion() {
    this.toastr.warning('Đã hủy áp dụng mã giảm giá');
    this.clearRedeemResult()
  }

  clearRedeemResult() {
    this.redeemResult.discount = 0;
    this.redeemResult.promotionCode = null;
    this.redeemResult.id = null;
  }

  order() {
    this.orderInformation.fullName = this.getFullName();
    this.orderInformation.destination = this.getDestination();
    this.orderInformation.phoneNumber = this.getPhoneNumber();
    this.orderService.checkout(this.orderInformation).subscribe(result => {
      this.cartService.refreshCartQuantity();
      this.toastr.success('Đặt hàng thành công');
      this.route.navigateByUrl('order-detail/' + result.id);
      this.orderService.clearCache();
    }, error => {
      this.toastr.error('Đã có lỗi xảy ra trong quá trình đặt hàng');
    })
  }

  getExpectedShippingDate(shippingMethod: ShippingMethod): string {
    var currentDate = new Date();
    let minDate = new Date(currentDate.setDate(currentDate.getDate() + shippingMethod.minTime));
    let maxDate = new Date(currentDate.setDate(currentDate.getDate() + shippingMethod.maxTime));
    return minDate.getDate() + '/' + (minDate.getMonth() + 1) + ' đến ' + 
      maxDate.getDate() + '/' + (maxDate.getMonth() + 1);

  }

  getPhoneNumber(): any {
    return this.checkoutForm.controls.phoneNumber.value;
  }

  getDestination(): any {
    return this.checkoutForm.controls.destination.value;
  }

  getFullName(): any {
    return this.checkoutForm.controls.fullName.value;
  }

  getEmail(): any {
    return this.checkoutForm.controls.email.value;
  }

  loadShipingMethod() {
    this.shippingService.getAllShippingMethods().subscribe(sm => {
      this.shippingMethods = sm;
      this.chosenShippingMethod = sm.find(x => x.state);
      this.orderInformation.shippingMethodId = this.chosenShippingMethod.id;
    })
  }

  chooseShippingMethod(chosenShippingMethod: ShippingMethod) {
    if (chosenShippingMethod.state) {
      this.chosenShippingMethod = chosenShippingMethod;
      this.orderInformation.shippingMethodId = chosenShippingMethod.id;
    }
  }

  loadPaymentMethod() {
    this.paymentService.getAllPaymentMethods().subscribe(pm => {
      this.paymentMethods = pm;
      this.chosenPaymentMethod = pm.find(x => x.state);
      this.orderInformation.paymentMethodId = this.chosenPaymentMethod.id;
    })
  }

  choosePaymentMethod(chosenPaymentMethod: PaymentMethod) {
    if (chosenPaymentMethod.state) {
      this.chosenPaymentMethod = chosenPaymentMethod;
      this.orderInformation.paymentMethodId = chosenPaymentMethod.id;
    }
  }

  goTo(stage: string) {
    this.stage = stage;
  }

}
