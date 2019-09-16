import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;
  constructor(private authService: AuthService,
              private usersService: UserService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params.nowCanLogin) {
        this.showMessage({
          text: 'You can now log in',
          type: 'success'
        });
      } else if (params.accessDenied) {
        this.showMessage({
          text: 'You need to be logged in to work with the system',
          type: 'warning'
        });
      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
      this.message = message;
      setTimeout(() => {
        this.message.text = '';
      }, 5000);
    }

  login() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'users']);
          } else {
            this.showMessage({
              text: 'Password is not correct',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'This user does not exist.',
            type: 'danger'
          });
        }
      });
  }
}
