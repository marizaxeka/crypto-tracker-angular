import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinInfoComponent } from './coin-info/coin-info.component';
import { CoinTypeListComponent } from './coin-type-list/coin-type-list.component';

const routes: Routes = [
  {path:'', redirectTo :'coin-list', pathMatch:'full'},
  {path:'coin-list', component:CoinTypeListComponent},
  {path:'coin-info/:id', component: CoinInfoComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
