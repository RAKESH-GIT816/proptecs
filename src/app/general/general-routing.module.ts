import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BidpropertyComponent } from './bidproperty/bidproperty.component';
import { ConfirmprofileComponent } from './confirmprofile/confirmprofile.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { ConfirmbidComponent } from './confirmbid/confirmbid.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AccountpreferencesComponent } from './accountpreferences/accountpreferences.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { AboutComponent } from './about/about.component';
import { CareerComponent } from './career/career.component';
import { MobileappsComponent } from './mobileapps/mobileapps.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { ViewallpropertiesComponent } from './viewallproperties/viewallproperties.component';
import { TopnavComponent } from './topnav/topnav.component';
import { AccountcardsComponent } from './accountcards/accountcards.component';

const routes: Routes = [
  { path: '', component: GeneralComponent},
  { path: 'login', component: LoginComponent},
  { path: 'login/:urlparamss', component: LoginComponent},
  // { path: 'login/:id/:urlprams', component: LoginComponent},
  { path: 'login/:id/:urlparamss', component: LoginComponent},  
  {path: 'register', component: SignupComponent},
  {path: 'bidproperty/:id/:mode', component: BidpropertyComponent},
  {path: 'confirmprofile/:id/:bidvalue', component: ConfirmprofileComponent},
  {path: 'paymentmethod/:id/:bidvalue', component: PaymentmethodComponent},
  {path: 'confirmbid/:id/:bidvalue/:id2', component: ConfirmbidComponent},
  {path: 'viewproperty/:id', component: PropertyDetailsComponent},
  {path: 'accountpreferences', component: AccountpreferencesComponent},
  {path: 'howitworks', component: HowitworksComponent},
  {path: 'about', component: AboutComponent},
  {path: 'career', component: CareerComponent},
  {path: 'mobileapp', component: MobileappsComponent},
  {path: 'professionals', component: ProfessionalsComponent},
  {path: 'forgetpassword', component: ForgetpasswordComponent},
  {path: 'heatmap', component: HeatmapComponent},
  {path: 'Viewallproperties', component: ViewallpropertiesComponent},
  {path: 'Topnav', component: TopnavComponent},
  {path: 'accountcards', component: AccountcardsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes )],
  exports: [RouterModule]
})


export class GeneralRoutingModule { }
