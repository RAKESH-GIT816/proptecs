import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellingRoutingModule } from './selling-routing.module';
import { SellingComponent } from './selling.component';
import { AllsellingactivityComponent } from './allsellingactivity/allsellingactivity.component';
import { SellhistoryComponent } from './sellhistory/sellhistory.component';
import{GeneralModule} from '../general/general.module';



@NgModule({
  declarations: [SellingComponent, AllsellingactivityComponent, SellhistoryComponent],
  imports: [
    CommonModule,
    SellingRoutingModule,
    GeneralModule
  ]
})
export class SellingModule { }
