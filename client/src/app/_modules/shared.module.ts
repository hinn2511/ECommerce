import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    BsDropdownModule
  ],
  exports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    BsDropdownModule
  ]
})

export class SharedModule { }
