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
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ScoresComponent} from './scores/scores.component';
import {AccessRoutingStudentGuard} from '../shared/services/access-routing-student.guard';
import {AccessRoutingTeacherGuard} from '../shared/services/access-routing-teacher.guard';
import {AccessControlWorkGuard} from '../shared/services/access-control-work.guard';
import {OpenQuestionComponent} from './open-question/open-question.component';
import {EvaluateTestComponent} from './evaluate-test/evaluate-test.component';

const routes: Routes = [
  // {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
  {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
    {path: 'users', canActivate: [AccessRoutingStudentGuard], component: UsersComponent},
    {path: 'control_works', canActivate: [AccessRoutingStudentGuard], component: ControlWorksComponent},
    {path: 'tests', canActivate: [AccessRoutingStudentGuard], component: TestingComponent},
    {path: 'groups', canActivate: [AccessRoutingStudentGuard], component: GroupsComponent},
    {path: 'tests/:id', canActivate: [AccessRoutingStudentGuard], component: TestingDetailComponent},
    {path: 'control-work/:id', canActivate: [AccessRoutingStudentGuard], component: ControlWorkDetailComponent},
    {path: 'group/:id', canActivate: [AccessRoutingStudentGuard], component: GroupDetailComponent},
    {path: 'user/:id', canActivate: [AccessRoutingStudentGuard], component: UserDetailComponent},
    {path: 'write_control_work/:id', canActivate: [AccessRoutingTeacherGuard, AccessControlWorkGuard], component: WriteControlWorkComponent},
    {path: 'choose_control_work', canActivate: [AccessRoutingTeacherGuard], component: ChooseControlWorkComponent},
    {path: 'user_profile', component: UserProfileComponent},
      {path: 'scores', component: ScoresComponent},
      {path: 'open-question', component: OpenQuestionComponent},
      {path: 'evaluate-test', component: EvaluateTestComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {

}
