import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../../shared/models/user.model';
import {Router} from '@angular/router';
import {AccessDuringControlWorkService} from '../../../../shared/services/access-during-control-work.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sub1: Subscription;
  loginedUser: User;

  constructor(private router: Router, private accessDuringControlWorkService: AccessDuringControlWorkService) { }

  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    // if (this.router.url.includes('/write_control_work')) {
    //  this.isWriteControlWork = true;
    // } else {
    //   this.isWriteControlWork = false;
    // }
  }

}
