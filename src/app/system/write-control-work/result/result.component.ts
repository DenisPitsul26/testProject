import {Component, Input, OnInit} from '@angular/core';
import {AccessDuringControlWorkService} from '../../../shared/services/access-during-control-work.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() maxScore;
  @Input() userScore;
  @Input() isConrtolWorlWithOpenQuestion;

  constructor(private accessDuringControlWorkService: AccessDuringControlWorkService) { }

  ngOnInit() {
    this.accessDuringControlWorkService.setIsWriteControlWork(false);
  }

}
