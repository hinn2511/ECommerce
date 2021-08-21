import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { viLocale } from 'ngx-bootstrap/locale';
 defineLocale('vi', viLocale);


@NgModule({
  declarations: [],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    NgxSpinnerModule,
    NgxGalleryModule,
    CommonModule,
    LayoutModule,
    FormsModule
  ],
  exports: [
    ToastrModule,
    TabsModule,
    PaginationModule,
    ButtonsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    BsDropdownModule,
    BsDatepickerModule,
    CommonModule,
    LayoutModule,
    FormsModule   
  ]
})

export class SharedModule { }
