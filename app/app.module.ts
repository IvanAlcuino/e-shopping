import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http' 
 
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { CustomFormsModule } from 'ng2-validation';
// import { DataTableModule } from 'angular5-data-table';

import {AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { environment } from '../environments/environment';   

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ProductsComponent } from './shopping/products/products.component';
import { ProductsPanelComponent } from './shopping/products-panel/products-panel.component';
import { ProductCardComponent } from './shopping/product-card/product-card.component';
import { ProductComponent } from './shopping/product/product.component';
import { ProductManagerComponent } from './admin/product-manager/product-manager.component';
import { UserProductsComponent } from './admin/user-products/user-products.component';
import { UserProfileComponent } from './admin/user-profile/user-profile.component';
import { FooterComponent } from './core/footer/footer.component';
import { UserComponent } from './user/user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { LoginComponent } from './core/login/login.component';
import { AuthService } from './shared/services/auth.service'; 
import { AuthGuardService } from './shared/services/auth-guard.service'; 
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service'; 
import { Global } from './global';



const appRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'home', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/add', component: ProductManagerComponent },
  { path: 'product/:id/:pageState',      component: ProductManagerComponent }, 
  { path: 'product/:id',      component: ProductComponent }, 
  { path: 'category',      component: ProductsComponent },
  { path: 'category/:categoryName',      component: ProductsComponent },
  { path: 'user/:user_id',      component: UserProductsComponent },
  { path: 'user/:user_id/profile',      component: UserProfileComponent },
  { path: 'login',      component: SignInComponent },
  { path: 'signup',      component: SignUpComponent },

  // { path : 'home', component : ProductsComponent},
  //   {
  //       path: 'signup', component: UserComponent,
  //       children: [{ path: '', component: SignUpComponent }]
  //   },
  //   {
  //       path: 'login', component: UserComponent,
  //       children: [{ path: '', component: SignInComponent }]
  //   },
  //   { path : '', redirectTo:'/login', pathMatch : 'full'} 
];


@NgModule({
  declarations: [
    AppComponent,
    ProductsPanelComponent,
    NavbarComponent,
    ProductsComponent,
    ProductCardComponent,
    ProductComponent,
    ProductManagerComponent,
    UserProductsComponent,
    UserProfileComponent,
    LoginComponent,
    FooterComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent, 
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot().ngModule,
    CustomFormsModule, 
    RouterModule.forRoot(
      appRoutes 
    ), 
   
  ],
  providers: [Global, AuthService, AuthGuardService, AuthGuardService, AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
