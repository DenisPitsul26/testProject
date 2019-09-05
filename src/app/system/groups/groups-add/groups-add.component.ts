import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Group} from '../../../shared/models/group.model';
import {Subscription} from 'rxjs';
import {GroupService} from '../../../auth/group.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'app-groups-add',
  templateUrl: './groups-add.component.html',
  styleUrls: ['./groups-add.component.css']
})
export class GroupsAddComponent implements OnInit, OnDestroy {

  @ViewChild('form') form1: NgForm;
  @Output() addFormIsVisible = new EventEmitter<boolean>();
  @Output() newGroupAdded = new EventEmitter<Group>();
  @Input() currentGroup: Group;
  @Input() groups: Group[];
  message: Message;
  group: Group;
  sub1: Subscription;
  flag: boolean;

  constructor(private groupsService: GroupService) { }

  ngOnInit() {
    if (this.currentGroup === undefined) {
      console.log('add', this.currentGroup);
    } else {
      console.log('update', this.currentGroup);
      setTimeout(() => {
        this.form1.controls.numberOfGroup.setValue(this.currentGroup.group);
        this.form1.controls.faculty.setValue(this.currentGroup.faculty);
      }, 1);
    }
    this.message = new Message('warning', '');
  }

  addUpdateTest() {
    if (this.currentGroup === undefined) {
      this.flag = false;
      this.group = new Group(this.form1.value.numberOfGroup, this.form1.value.faculty);
      for (const group1 of this.groups) {
        if (this.group.group === group1.group) {
          this.flag = true;
        }
      }
      if (!this.flag) {
        this.sub1 = this.groupsService.addGroup(this.group).subscribe((group1) => {
          this.newGroupAdded.emit(group1);
          this.form1.reset();
          this.addFormIsVisible.emit(false);
        });
      } else {
        this.showMessage({
          text: 'This group already exists',
          type: 'warning'
        });
      }
    } else {
      this.group = new Group(this.form1.value.numberOfGroup, this.form1.value.faculty, this.currentGroup.id);
      this.sub1 = this.groupsService.updateGroup(this.group).subscribe((group1) => {
        this.newGroupAdded.emit(group1);
        this.form1.reset();
        this.addFormIsVisible.emit(false);
      });
    }
  }
  cancel() {
    this.form1.reset();
    this.addFormIsVisible.emit(false);
  }

  private showMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
