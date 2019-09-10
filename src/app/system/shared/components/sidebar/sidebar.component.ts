import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../../shared/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sub1: Subscription;
  loginedUser: User;
  constructor() { }

  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
  }

}
