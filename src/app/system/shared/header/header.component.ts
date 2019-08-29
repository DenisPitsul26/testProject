import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
