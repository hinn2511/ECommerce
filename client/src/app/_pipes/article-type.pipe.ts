import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleType'
})
export class ArticleTypePipe implements PipeTransform {

  transform(value: number | string): string {
    if (value == 0 || value == 'all') return 'Tất cả tin tức';
    if (value == 1 || value == 'news') return 'Thông báo mới';
    if (value == 2 || value == 'promotions') return 'Tin khuyến mãi';
    return 'Thông tin sản phẩm';
  }

}
