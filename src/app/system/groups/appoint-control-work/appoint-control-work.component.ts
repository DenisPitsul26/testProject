import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../shared/models/group.model';
import {ControlWork} from '../../../shared/models/controlWork.model';
import {ControlWorksService} from '../../../shared/services/control-works.service';
import {Subscription} from 'rxjs';
import {GroupService} from '../../../shared/services/group.service';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'app-appoint-control-work',
  templateUrl: './appoint-control-work.component.html',
  styleUrls: ['./appoint-control-work.component.css'],
  animations: [fadeStateTrigger]
})
export class AppointControlWorkComponent implements OnInit {
  @Output() appointFormIsVisible = new EventEmitter<boolean>();
  @Output() groupAppointed = new EventEmitter<Group>();
  @Input() currentGroup: Group;
  @Input() groups: Group[];
  controlWorks: ControlWork[];
  sub1: Subscription;
  isLoaded = false;
  private updateGroupLength: number;
  private checkId: number;
  private check1: boolean;
  private checkedControlWorks: ControlWork[] = [];
  private checkedControlWork: boolean;
  private newGroup: Group;

  constructor(private controlWorksService: ControlWorksService, private groupsService: GroupService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.controlWorksService.getControlWorks().subscribe((controls: ControlWork[]) => {
      this.controlWorks = controls;
      this.checkId = this.controlWorks.length;
    });

    setTimeout(() => {
      if (this.currentGroup !== undefined) {
        this.updateGroupLength = this.currentGroup.expectedControlWorks.length;
        setTimeout(() => {
          for (let i = 0; i < this.updateGroupLength; i++) {
            for (let j = 0; j < this.checkId; j++) {
              if (this.controlWorks[j].id === this.currentGroup.expectedControlWorks[i].id) {
                (document.getElementById(String((j + 1))) as HTMLInputElement).checked = true;
              }
            }
          }
        }, 10);
      }
      this.isLoaded = true;
    }, 50);
  }

  toAppoint() {
    setTimeout(() => {
      if (this.currentGroup !== undefined) {
        for (let i = 1; i <= this.controlWorks.length; i++) {
          this.check1 = (<HTMLInputElement> document.getElementById(String(i))).checked;
          if (this.check1) {
            this.checkedControlWorks.push(this.controlWorks[i - 1]);
            this.checkedControlWork = true;
          }
        }
        if (this.checkedControlWork) {
          this.newGroup = new Group(this.currentGroup.group, this.currentGroup.faculty, this.checkedControlWorks, this.currentGroup.id);
          this.groupsService.updateGroup(this.newGroup).subscribe((group: Group) => {
            this.groupAppointed.emit(group);
            this.cancel();
          });
        } else {
          // alert('something went wrong');
          this.newGroup = new Group(this.currentGroup.group, this.currentGroup.faculty, this.checkedControlWorks, this.currentGroup.id);
          this.groupsService.updateGroup(this.newGroup).subscribe((group: Group) => {
            this.groupAppointed.emit(group);
            this.cancel();
          });
        }
      }
    }, 1);
  }

  cancel() {
    this.appointFormIsVisible.emit(false);
  }
}
