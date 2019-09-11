import { Component, OnInit } from '@angular/core';
import {Group} from '../shared/models/group.model';
import {group} from '@angular/animations';
import {GroupService} from '../shared/services/group.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }
}
