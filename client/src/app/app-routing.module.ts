import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { CartComponent } from './customer/cart/cart.component';
import { CheckOutComponent } from './customer/check-out/check-out.component';
import { CustomerFavoriteComponent } from './customer/customer-favorite/customer-favorite.component';
import { CustomerInfoComponent } from './customer/customer-info/customer-info.component';
import { CustomerNotificationsComponent } from './customer/customer-notifications/customer-notifications.component';
import { CustomerOrderDetailComponent } from './customer/customer-order-detail/customer-order-detail.component';
import { CustomerOrderComponent } from './customer/customer-order/customer-order.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { RegisterComponent } from './register/register.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { AuthenticationGuard } from './_guards/authentication.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  //authentication
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'my-account', component: CustomerInfoComponent },
      { path: 'notifications', component: CustomerNotificationsComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'order', component: CustomerOrderComponent},
      { path: 'order-detail/:id', component: CustomerOrderDetailComponent},
      { path: 'favorites', component: CustomerFavoriteComponent },
    ]
  },
  //customer
  { path: 'category/:category', component: ProductListComponent },
  { path: 'area/:area', component: ProductListComponent },
  { path: 'sale', component: ProductListComponent },
  { path: 'product/:code/:name', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'news', component: NewsListComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'help', component: HelpSupportComponent },
  //errors
  { path: 'test-errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
