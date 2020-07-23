import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ 
  path: '', loadChildren: () => import('./general/general.module').then(m => m.GeneralModule) },

{ path: 'mydashboard/Buying', loadChildren: () => import('./buying/buying.module').then(m => m.BuyingModule) },
  { path: 'mydashboard/Selling', loadChildren: () => import('./selling/selling.module').then(m => m.SellingModule) },
  { path: 'propertydetails', loadChildren: () => import('./sellproperties/sellproperties.module').then(m => m.SellpropertiesModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
