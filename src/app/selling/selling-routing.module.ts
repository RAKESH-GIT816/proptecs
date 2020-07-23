import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellingComponent } from './selling.component';
import { AllsellingactivityComponent } from './allsellingactivity/allsellingactivity.component';
import { SellhistoryComponent } from './sellhistory/sellhistory.component';

const routes: Routes = [
  { path: '', component: AllsellingactivityComponent },
  { path: 'allsellingactivity', component: AllsellingactivityComponent },
  { path: 'history', component: SellhistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellingRoutingModule { }
