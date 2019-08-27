import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';

@NgModule({
  imports: [CommonModule, SystemRoutingModule],
  declarations: [SystemComponent]
})
export class SystemModule {}
