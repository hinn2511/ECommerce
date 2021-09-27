export interface Checkout {
    fullName: string;
    destination: string;
    phoneNumber: string;
    shippingMethodId: number;
    paymentMethodId: number;
    promotionId: number;
}