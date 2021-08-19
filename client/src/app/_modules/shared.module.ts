import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    TabsModule.forRoot(),
    RatingModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    NgxGalleryModule,
    CommonModule,
    LayoutModule,
    FormsModule
  ],
  exports: [
    ToastrModule,
    TabsModule,
    RatingModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    BsDropdownModule,
    CommonModule,
    LayoutModule,
    FormsModule   
  ]
})

export class SharedModule { }
