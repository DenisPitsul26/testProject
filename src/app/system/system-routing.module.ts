import {SystemComponent} from './system.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../auth/auth.guard';
import {UsersComponent} from './users/users.component';
import {ControlWorksComponent} from './control-works/control-works.component';
import {GroupsComponent} from './groups/groups.component';
import {TestingComponent} from './testing/testing.component';
import {TestingDetailComponent} from './testing-detail/testing-detail.component';
import {ControlWorkDetailComponent} from './control-work-detail/control-work-detail.component';
import {GroupDetailComponent} from './group-detail/group-detail.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {ChooseControlWorkComponent} from './choose-control-work/choose-control-work.component';
import {WriteControlWorkComponent} from './write-control-work/write-control-work.component';

const routes: Routes = [
  // {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
  {path: '', component: SystemComponent, children: [
    {path: 'users', component: UsersComponent},
    {path: 'control_works', component: ControlWorksComponent},
    {path: 'tests', component: TestingComponent},
    {path: 'groups', component: GroupsComponent},
    {path: 'tests/:id', component: TestingDetailComponent},
    {path: 'control-work/:id', component: ControlWorkDetailComponent},
    {path: 'group/:id', component: GroupDetailComponent},
    {path: 'user/:id', component: UserDetailComponent},
    {path: 'choose_control_work', component: ChooseControlWorkComponent},
    {path: 'write_control_work', component: WriteControlWorkComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {

}
