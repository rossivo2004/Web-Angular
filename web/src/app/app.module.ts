import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { Admin_categoryComponent } from './components/admin_category/admin_category.component';
import { Nav_list_categoriesComponent } from './components/nav_list_categories/nav_list_categories.component'; // Import the Nav_list_categoriesComponent here
import { Admin_category_editComponent } from './components/admin_category_edit/admin_category_edit.component';
import { Admin_productsComponent } from './components/admin_products/admin_products.component';
import { Admin_products_editComponent } from './components/admin_products_edit/admin_products_edit.component';
import { Product_detailComponent } from './components/product_detail/product_detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product_detail/:id', component: Product_detailComponent },
  { path: 'admin_category', component: Admin_categoryComponent },
  {
    path: 'admin_category_edit/:id_cate',
    component: Admin_category_editComponent,
  },
  { path: 'admin_products', component: Admin_productsComponent },
  {
    path: 'admin_products_edit/:id_pro',
    component: Admin_products_editComponent,
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ShopComponent,
    Nav_list_categoriesComponent,
    Admin_categoryComponent, // Don't forget to add Nav_list_categoriesComponent to declarations
    Admin_category_editComponent,
    Admin_productsComponent,
    Admin_products_editComponent,
    Product_detailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule, // Import CommonModule here
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
