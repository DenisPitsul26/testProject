import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../../shared/models/user.model';
import {GroupService} from '../../shared/services/group.service';
import {Group} from '../../shared/models/group.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-registrotion',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [fadeStateTrigger]
})
export class RegistrationComponent implements OnInit {

  constructor(private usersService: UserService, private groupService: GroupService, private router: Router) { }

  groupsName: string[] = [];
  form: FormGroup;
  groups: Group[];
  groupsFake: Group[];
  errorMessage = '';

  // passwordsDoNotMatch(controls: FormControl[]) {
  //   if (controls.controls.password.value === controls.controls.repeatPassword.value) {
  //     console.log('111');
  //     return null;
  //   } else {
  //     console.log('222');
  //     return true;
  //   }
  // }

  ngOnInit() {
    this.groupService.getGroups().subscribe((group: Group[]) => {
      this.groups = group;
      this.groupsFake = this.groups;

      for (let i = 0; i < this.groupsFake.length; i++) {
        if (this.groupsFake[i].group === 'Admins') {
          this.groupsFake.splice( i, 1);
        }
        if (this.groupsFake[i].group === 'Teachers') {
          this.groupsFake.splice( i, 1);
        }
      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      passwordGroup: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        repeatPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      }),
      name: new FormControl(null, [Validators.required]),
      numberOfGroup: new FormControl(1, [Validators.required])
    });
    console.log(this.form);
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }

  onSubmit() {
    const {email, passwordGroup, name, numberOfGroup} = this.form.value;
    console.log('pass1', passwordGroup.password);
    console.log('pass2', passwordGroup.repeatPassword);
    if (passwordGroup.password === passwordGroup.repeatPassword) {
      this.errorMessage = '';
      const user = new User(email, passwordGroup.password, name, 0, +numberOfGroup, []);
      this.usersService.createNewUser(user).subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
    } else {
      this.errorMessage = 'Passwords do not match.';
    }
  }
}
