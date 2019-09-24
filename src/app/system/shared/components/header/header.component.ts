import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/models/user.model';
import {AccessDuringControlWorkService} from '../../../../shared/services/access-during-control-work.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(private authService: AuthService,
              private router: Router,
              private accessDuringControlWorkService: AccessDuringControlWorkService) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    // if (this.router.url.includes('/write_control_work')) {
    //   this.isWriteControlWork = true;
    // } else {
    //   this.isWriteControlWork = false;
    // }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
