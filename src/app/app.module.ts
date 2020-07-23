import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DataViewModule} from 'primeng/dataview';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as jQuery from 'jquery';
import {NgxPaginationModule} from 'ngx-pagination';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
// import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataViewModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    // NgbModule
    // NgbPagination
    // NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
