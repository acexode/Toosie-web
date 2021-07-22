import { CheckoutComponent } from './../../pages/checkout/checkout.component';
import { AutoRefillComponent } from './../../pages/auto-refill/auto-refill.component';
import { PrescriptionHistoryComponent } from './../../pages/prescription-history/prescription-history.component';
import { UploadComponent } from './../../pages/upload/upload.component';
import { CartComponent } from './../../pages/cart/cart.component';
import { ContactComponent } from './../../components/contact/contact.component';
import { BlogComponent } from './../../components/blog/blog.component';
import { ShopComponent } from './../../pages/shop/shop.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from 'src/app/pages/landing/landing.component';

const routes: Routes = [
  { path: '',      component: LandingComponent },
  { path: 'auto-refill',      component: AutoRefillComponent },
  { path: 'blog',      component: BlogComponent },
  { path: 'cart',      component: CartComponent },
  { path: 'checkout',      component: CheckoutComponent },
  { path: 'contact',      component: ContactComponent },
  { path: 'prescription-history',      component: PrescriptionHistoryComponent },
  { path: 'shop',      component: ShopComponent },
  { path: 'upload-prescription',      component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutsRoutingModule { }
