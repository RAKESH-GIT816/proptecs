import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { BuyingRoutingModule } from './buying-routing.module';
import { BuyingComponent } from './buying.component';
import { BidsacceptedComponent } from './bidsaccepted/bidsaccepted.component';
import { PropertiesinescrowComponent } from './propertiesinescrow/propertiesinescrow.component';
import { HistoryComponent } from './history/history.component';
import { GeneralModule } from '../general/general.module';
import { SavedpropertiesComponent } from './savedproperties/savedproperties.component';
import { TimeconvertPipe } from '../pipe/TimeconvertPipe'



@NgModule({
  declarations: [BuyingComponent, BidsacceptedComponent, PropertiesinescrowComponent, HistoryComponent, SavedpropertiesComponent, TimeconvertPipe],
  imports: [
    CommonModule,
    BuyingRoutingModule,
    GeneralModule


  ]
})
export class BuyingModule { }
