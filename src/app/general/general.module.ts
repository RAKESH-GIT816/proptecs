import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { TopnavComponent } from './topnav/topnav.component';
import { FooterComponent } from './footer/footer.component';
import {DataViewModule} from 'primeng/dataview';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { BidpropertyComponent } from './bidproperty/bidproperty.component';
import { ConfirmprofileComponent } from './confirmprofile/confirmprofile.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { ConfirmbidComponent } from './confirmbid/confirmbid.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AccountpreferencesComponent } from './accountpreferences/accountpreferences.component';
import {GalleriaModule} from 'primeng/galleria';
import {FileUploadModule} from 'primeng/fileupload';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { AboutComponent } from './about/about.component';
import { CareerComponent } from './career/career.component';
import { MobileappsComponent } from './mobileapps/mobileapps.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { ViewallpropertiesComponent } from './viewallproperties/viewallproperties.component';
import { TopnavMenuComponent } from './topnav-menu/topnav-menu.component';
import { AccountcardsComponent } from './accountcards/accountcards.component';


@NgModule({
  declarations: [GeneralComponent, TopnavComponent, FooterComponent, LoginComponent, SignupComponent, SidemenuComponent, BidpropertyComponent, ConfirmprofileComponent, PaymentmethodComponent, ConfirmbidComponent, PropertyDetailsComponent, AccountpreferencesComponent, HowitworksComponent, AboutComponent, CareerComponent, MobileappsComponent, ProfessionalsComponent, ForgetpasswordComponent, HeatmapComponent, ViewallpropertiesComponent, TopnavMenuComponent, AccountcardsComponent],
  imports: [
  
    CommonModule,
    GeneralRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataViewModule,
    GalleriaModule,
    FileUploadModule,
    NgSelectModule,
  ],
  exports: [
    SidemenuComponent,
    TopnavComponent,
    FooterComponent,
    ConfirmprofileComponent,FileUploadModule,
    DataViewModule,
    NgSelectModule
 
  ]
})
export class GeneralModule { }
