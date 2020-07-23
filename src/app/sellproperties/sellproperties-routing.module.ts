import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SellpropertiesComponent } from './sellproperties.component';
import { HomeequaityComponent } from './homeequaity/homeequaity.component';
import { PhotosandvideosComponent } from './photosandvideos/photosandvideos.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ListingdetailsComponent } from './listingdetails/listingdetails.component';
import { PromoteemailComponent } from './promoteemail/promoteemail.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PropertypaymentmethodComponent } from './propertypaymentmethod/propertypaymentmethod.component';

const routes: Routes = [
  { path: 'new', component: SellpropertiesComponent },
  {path: 'wholesaleprofit/:id', component: HomeequaityComponent},
  {path: ':id', component: SellpropertiesComponent}, 
  // {path: 'id/:mode', component: SellpropertiesComponent}, 
  { path: 'propertyphotosandvideos/:id', component: PhotosandvideosComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
  { path: 'listingdetails/:id', component: ListingdetailsComponent },
  { path: 'promoteemail/:id', component: PromoteemailComponent },
  { path: 'userprofile/:id', component: UserprofileComponent },
  { path: 'propertypaymentmethod/:id', component: PropertypaymentmethodComponent }
  

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellpropertiesRoutingModule  { 






}
