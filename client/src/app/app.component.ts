import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Minimalist Closet';
  products: any;
  
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.http.get('https://localhost:5001/api/products').subscribe(response => {
      this.products = response;
    }, error => {
      console.log(error);
    })
  }
}
