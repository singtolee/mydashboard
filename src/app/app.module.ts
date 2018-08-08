import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserPageComponent } from './user-page/user-page.component';
import { DropZoneDirective } from './drop-zone.directive';
import { CategoryManagerComponent } from './category-manager/category-manager.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CarouselComponent } from './carousel/carousel.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { CartReaderComponent } from './cart-reader/cart-reader.component';
import { BannerManagerComponent } from './banner-manager/banner-manager.component';
import { ImgZoomComponent } from './img-zoom/img-zoom.component';
import { UserAddressProfileComponent } from './user-address-profile/user-address-profile.component';
import { PrdListComponent } from './prd-list/prd-list.component';
import { PrdCardComponent } from './prd-card/prd-card.component';
import { ProductsViewByKeywordComponent } from './products-view-by-keyword/products-view-by-keyword.component';
export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    UserPageComponent,
    DropZoneDirective,
    CategoryManagerComponent,
    BankAccountComponent,
    EditProductComponent,
    CarouselComponent,
    OrderManagerComponent,
    CartReaderComponent,
    BannerManagerComponent,
    ImgZoomComponent,
    UserAddressProfileComponent,
    PrdListComponent,
    PrdCardComponent,
    ProductsViewByKeywordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ClipboardModule,
    NgbModule.forRoot()
  ],
  entryComponents:[
   ImgZoomComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
