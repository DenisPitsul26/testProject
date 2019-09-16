import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  loginedUser: User;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
  }

  goBack() {
    if (this.loginedUser) {
      if (this.loginedUser.isAdmin === 1 || this.loginedUser.isAdmin === 2) {
        this.router.navigate(['/system/users']);
      } else {
        this.router.navigate(['/system/scores']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
