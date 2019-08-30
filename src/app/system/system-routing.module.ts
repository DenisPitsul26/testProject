import {SystemComponent} from './system.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../auth/auth.guard';
import {UsersComponent} from './users/users.component';
import {ControlWorksComponent} from './control-works/control-works.component';
import {GroupsComponent} from './groups/groups.component';

const routes: Routes = [
  {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
    {path: 'users', component: UsersComponent},
    {path: 'control_works', component: ControlWorksComponent},
    {path: 'groups', component: GroupsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {

}
