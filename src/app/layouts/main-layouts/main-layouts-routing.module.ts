import { ContactComponent } from './../../components/contact/contact.component';
import { BlogComponent } from './../../components/blog/blog.component';
import { ShopComponent } from './../../pages/shop/shop.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from 'src/app/pages/landing/landing.component';

const routes: Routes = [
  { path: '',      component: LandingComponent },
  { path: 'shop',      component: ShopComponent },
  { path: 'blog',      component: BlogComponent },
  { path: 'contact',      component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutsRoutingModule { }
