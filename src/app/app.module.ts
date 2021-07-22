import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { FlutterwaveModule } from 'flutterwave-angular-v3';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';

import { ShopComponent } from './pages/shop/shop.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlogComponent } from './components/blog/blog.component';
import { PageHeroComponent } from './components/page-hero/page-hero.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { UploadComponent } from './pages/upload/upload.component';
import { PrescriptionHistoryComponent } from './pages/prescription-history/prescription-history.component';
import { AutoRefillComponent } from './pages/auto-refill/auto-refill.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    // HeroComponent,
    // MainLayoutsComponent,
    
    ShopComponent,
    NotFoundComponent,
    BlogComponent,
    PageHeroComponent,
    ContactComponent,
    CartComponent,
    UploadComponent,
    PrescriptionHistoryComponent,
    AutoRefillComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    FlutterwaveModule,
    NgSelectModule ,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
