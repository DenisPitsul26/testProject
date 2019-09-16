import {Component, HostBinding, OnInit} from '@angular/core';
import {Group} from '../shared/models/group.model';
import {group} from '@angular/animations';
import {GroupService} from '../shared/services/group.service';
import {fadeStateTrigger} from '../shared/animations/fade.animation';


@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
  animations: [fadeStateTrigger]
})
export class SystemComponent implements OnInit {
  // @HostBinding('@fade') a = true;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }
}
