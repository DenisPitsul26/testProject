import {SystemComponent} from './system.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  {path: '', component: SystemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {

}
