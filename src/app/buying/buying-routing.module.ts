import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyingComponent } from './buying.component';
import { SavedpropertiesComponent } from './savedproperties/savedproperties.component';
import { BidsacceptedComponent } from './bidsaccepted/bidsaccepted.component';
import { PropertiesinescrowComponent } from './propertiesinescrow/propertiesinescrow.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', component: BuyingComponent },
  { path: 'activebids', component: BuyingComponent },
  { path: 'bidsaccepted', component: BidsacceptedComponent },
  { path: 'propertiesinescrow', component: PropertiesinescrowComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'savedproperties', component: SavedpropertiesComponent }
];

  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyingRoutingModule { }
