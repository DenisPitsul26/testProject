import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SystemComponent} from './system/system.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'system', component: SystemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
