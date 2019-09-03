import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { ControlWorksComponent } from './control-works/control-works.component';
import { DropdownDirective } from './directives/dropdown.directive';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, SystemRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [
    SystemComponent,
    HeaderComponent,
    SidebarComponent,
    UsersComponent,
    GroupsComponent,
    ControlWorksComponent,
    DropdownDirective
  ]
})
export class SystemModule {}