import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Group} from '../../../shared/models/group.model';
import {Subscription} from 'rxjs';
import {GroupService} from '../../../shared/services/group.service';
import {Message} from '../../../shared/models/message.model';
import {ControlWork} from '../../../shared/models/controlWork.model';

@Component({
  selector: 'app-groups-add',
  templateUrl: './groups-add.component.html',
  styleUrls: ['./groups-add.component.css']
})
export class GroupsAddComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static: false}) form1: NgForm;
  @Output() addFormIsVisible = new EventEmitter<boolean>();
  @Output() newGroupAdded = new EventEmitter<Group>();
  @Input() currentGroup: Group;
  @Input() groups: Group[];
  message: Message;
  group: Group;
  sub1: Subscription;
  flag: boolean;
  updatedGroup: Group;
  appointedControlWorks: ControlWork[];
  private updateGroupLength: number;
  private isLoaded = false;
  private isAppointedControlWorksEmpty = true;

  constructor(private groupsService: GroupService) { }

  ngOnInit() {
    if (this.currentGroup !== undefined) {
      setTimeout(() => {
        this.form1.controls.numberOfGroup.setValue(this.currentGroup.group);
        this.form1.controls.faculty.setValue(this.currentGroup.faculty);
        this.appointedControlWorks = JSON.parse(JSON.stringify(this.currentGroup.expectedControlWorks));
        if (this.appointedControlWorks.length > 0) {
          this.isAppointedControlWorksEmpty = false;
        }
      }, 10);
    }
    this.message = new Message('warning', '');
    this.isLoaded = true;
  }

  addUpdateGroup() {
    if (this.currentGroup === undefined) {
      this.flag = false;
      this.group = new Group(this.form1.value.numberOfGroup, this.form1.value.faculty, []);
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
      this.group = new Group(this.form1.value.numberOfGroup, this.form1.value.faculty,
        this.appointedControlWorks, this.currentGroup.id);
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
    if (this.currentGroup !== undefined) {
      this.appointedControlWorks = this.currentGroup.expectedControlWorks;
    }
  }

  private showMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  delete(idx: number) {
    this.appointedControlWorks.splice(idx, 1);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
