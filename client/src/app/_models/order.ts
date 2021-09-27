export interface OrderDetail {
    productCode: string;
    productName: string;
    photoUrl: string;
    colorCode: string;
    colorName: string;
    price: string;
    quantity: number;
}

export interface Promotion {
    id: number;
    promotionCode: string;
    discountPercent: number;
    maxDiscountAmount: number;
    minOrderTotal: number;
    start: Date;
    end: Date;
}

export interface ShippingMethod {
    id: number;
    name: string;
    minTime: number;
    maxTime: number;
    price: number;
    state: boolean;
}

export interface PaymentMethod {
    id: number;
    name: string;
    state: boolean;
}

export interface Order {
    id: number;
    date: Date;
    fullName: string;
    destination: string;
    phoneNumber: string;
    orderDetails: OrderDetail[];
    promotion: Promotion;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethod;
    subTotal: number;
    discount: number;
    state: number;
}