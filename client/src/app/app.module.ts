import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { SearchComponent } from './search/search.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { CollectionsComponent } from './collections/collections.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { AreaComponent } from './area/area.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { CustomerInfoComponent } from './customer/customer-info/customer-info.component';
import { CustomerFavoriteComponent } from './customer/customer-favorite/customer-favorite.component';
import { CartComponent } from './customer/cart/cart.component';
import { CustomerNotificationsComponent } from './customer/customer-notifications/customer-notifications.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { NumberInputComponent } from './_forms/number-input/number-input.component';
import { NumberOnlyDirective } from './_directives/number-only.directive';
import { DebounceClickDirective } from './_directives/debounce-click.directive';
import { CheckOutComponent } from './customer/check-out/check-out.component';
import { CustomerOrderComponent } from './customer/customer-order/customer-order.component';
import { CustomerOrderDetailComponent } from './customer/customer-order-detail/customer-order-detail.component';
import { OrderStatePipe } from './_pipes/order-state.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    HomePageComponent,
    ProductDetailComponent,
    NotFoundComponent,
    ProductCardComponent,
    SearchComponent,
    PromotionsComponent,
    CollectionsComponent,
    HelpSupportComponent,
    AreaComponent,
    FooterComponent,
    NewsComponent,
    CustomerInfoComponent,
    CustomerFavoriteComponent,
    CartComponent,
    CustomerNotificationsComponent,
    TestErrorsComponent,
    ServerErrorComponent,
    TextInputComponent,
    DateInputComponent,
    NumberInputComponent,
    NumberOnlyDirective,
    DebounceClickDirective,
    CheckOutComponent,
    CustomerOrderComponent,
    CustomerOrderDetailComponent,
    OrderStatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
