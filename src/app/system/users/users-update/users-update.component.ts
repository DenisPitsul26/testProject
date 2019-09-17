import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from '../../../shared/models/message.model';
import {Group} from '../../../shared/models/group.model';
import {User} from '../../../shared/models/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {GroupService} from '../../../shared/services/group.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';


@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.css'],
  animations: [fadeStateTrigger]
})
export class UsersUpdateComponent implements OnInit, OnDestroy {
  isLoaded = false;
  groups: Group[];
  @Input() users: User[];
  @Input() currentUser: User;
  @Output() updateFormIsVisible = new EventEmitter<boolean>();
  @Output() userUpdated = new EventEmitter<User>();
  sub1: Subscription;
  private form: FormGroup;


  constructor(private usersService: UserService, private groupsService: GroupService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.form = new FormGroup({
      group1: new FormControl(null, [Validators.required]),
    });
    setTimeout(() => {
      console.log(this.form);
      this.sub1 = this.groupsService.getGroups().subscribe((groups: Group[]) => {
        this.groups = groups;
        this.isLoaded = true;
        console.log('ddd', this.isLoaded);
      });
    }, 10);
  }

  updateGroup() {
    this.currentUser = new User(this.currentUser.email, this.currentUser.password, this.currentUser.name,
                            this.currentUser.isAdmin, +this.form.value.group1, this.currentUser.resultsOfControlWorks,
                            this.currentUser.id, this.currentUser.numberOfGroup);
    this.sub1 = this.usersService.updateUser(this.currentUser).subscribe((user: User) => {
      this.userUpdated.emit(user);
      this.form.reset();
      this.updateFormIsVisible.emit(false);
    });
  }

  cancel() {
    this.form.reset();
    this.updateFormIsVisible.emit(false);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
