import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderState'
})
export class OrderStatePipe implements PipeTransform {

  transform(value: number): string {
    if (value == 0) return 'Chờ xác nhận';
    if (value == 1) return 'Đang chuẩn bị';
    if (value == 2) return 'Đang giao';
    if (value == 3) return 'Đã giao';
    if (value == 4) return 'Đã hủy';
    return "Chờ xác nhận";
  }

}
