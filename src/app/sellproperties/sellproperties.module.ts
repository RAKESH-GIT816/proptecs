import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellpropertiesRoutingModule } from './sellproperties-routing.module';
import { SellpropertiesComponent } from './sellproperties.component';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import {DataViewModule} from 'primeng/dataview';
import{GeneralModule} from '../general/general.module';
import { SellSidemenuComponent } from './sell-sidemenu/sell-sidemenu.component';
import { HomeequaityComponent } from './homeequaity/homeequaity.component';
import { PhotosandvideosComponent } from './photosandvideos/photosandvideos.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ListingdetailsComponent } from './listingdetails/listingdetails.component';
import { PromoteemailComponent } from './promoteemail/promoteemail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { MyDatePickerModule } from 'mydatepicker';
import { ClipboardModule } from 'ngx-clipboard';


import { UserprofileComponent } from './userprofile/userprofile.component';
import { PropertypaymentmethodComponent } from './propertypaymentmethod/propertypaymentmethod.component';



@NgModule({
  
declarations: [SellpropertiesComponent, SellSidemenuComponent, HomeequaityComponent, PhotosandvideosComponent, ConfirmationComponent, ListingdetailsComponent, PromoteemailComponent,SellpropertiesComponent, UserprofileComponent, PropertypaymentmethodComponent],
  imports: [
    CommonModule,
    SellpropertiesRoutingModule,
    GeneralModule,
    DataViewModule,
    FormsModule,
    ReactiveFormsModule,
    NguiAutoCompleteModule,
    FileUploadModule,
    MyDatePickerModule,
    FileUploadModule,
    ClipboardModule,
    
    
  ],
  exports: [
   SellSidemenuComponent
  ]
})

export class SellpropertiesModule { }
