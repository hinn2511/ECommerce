import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderState'
})
export class OrderStatePipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) return 'Chờ xác nhận';
    if (value == 2) return 'Đang giao hàng';
    if (value == 3) return 'Đã giao hàng';
    if (value == 4) return 'Đã hủy';
    return "Chờ xác nhận";
  }

}
