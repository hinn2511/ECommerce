import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { urlContain } from '../_services/helper';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  displayIn(uriList: string[]): boolean {
    return urlContain(this.router, uriList);
  }
}
