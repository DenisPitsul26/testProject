import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { ControlWorksComponent } from './control-works/control-works.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TestingComponent } from './testing/testing.component';
import { TestingDetailComponent } from './testing-detail/testing-detail.component';
import { ControlWorkDetailComponent } from './control-work-detail/control-work-detail.component';
import { TestingAddComponent } from './testing/testing-add/testing-add.component';
import { MyCountPipe } from './shared/pipes/my-count.pipe';
import { ControlAddComponent } from './control-works/control-add/control-add.component';
import { GroupsAddComponent } from './groups/groups-add/groups-add.component';
import {GroupDetailComponent} from './group-detail/group-detail.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ChooseControlWorkComponent } from './choose-control-work/choose-control-work.component';
import { WriteControlWorkComponent } from './write-control-work/write-control-work.component';
import { ResultComponent } from './write-control-work/result/result.component';
import {AppointControlWorkComponent} from './groups/appoint-control-work/appoint-control-work.component';
import { ScoresComponent } from './scores/scores.component';
import { ScoreComponent } from './scores/score/score.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NumberToTimePipe } from './shared/pipes/number-to-time.pipe';
import {SharedModule} from '../shared/shared.module';
import { UsersUpdateComponent } from './users/users-update/users-update.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { OpenQuestionComponent } from './open-question/open-question.component';
import { OpenQuestionAddComponent } from './open-question/open-question-add/open-question-add.component';

@NgModule({
  imports: [CommonModule, RouterModule, SystemRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [
    SystemComponent,
    HeaderComponent,
    SidebarComponent,
    UsersComponent,
    GroupsComponent,
    ControlWorksComponent,
    TestingComponent,
    TestingDetailComponent,
    ControlWorkDetailComponent,
    TestingAddComponent,
    MyCountPipe,
    GroupsAddComponent,
    GroupDetailComponent,
    DropdownDirective,
    UserDetailComponent,
    MyCountPipe,
    ControlAddComponent,
    WriteControlWorkComponent,
    ResultComponent,
    ControlAddComponent,
    ChooseControlWorkComponent,
    AppointControlWorkComponent,
    UserProfileComponent,
    ScoresComponent,
    ScoreComponent,
    NumberToTimePipe,
    UsersUpdateComponent,
    FilterPipe,
    OpenQuestionComponent,
    OpenQuestionAddComponent
  ]
})
export class SystemModule {}
