import { Router } from "@angular/router";

export function redirectTo(router: Router, uri: String) {
  router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    router.navigate([uri]));
}

export function urlContain(router: Router, uriList: string[]): boolean {
  let result = true;
  for (let element of uriList) {
    if (router.url == element) {
      result = false;
      break;
    }
  }
  return !result;
}

export function addDays(date: Date, days: number): Date {
  date.setDate(date.getDate() + days);
  return date;
}

export function getMonthFromString(month): string {
  month = month.toLowerCase();
  var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  var result = months.indexOf(month);
  return result.toString();
}

export function selectSort(type: string): string {
  switch (type) {
    case 'newest':
      return "Mới nhất";
    case 'highestPrice':
      return "Giá từ cao xuống thấp";
    case 'lowestPrice':
      return "Giá từ thấp đến cao";
    case 'salePercent':
      return "Giảm giá nhiều";
  }
  return "Mặc định";
}

export function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

export function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}