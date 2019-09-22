import {ControlWork} from './controlWork.model';
import {AnswerInOpenQuestions} from './answer-in-open-questions';

export class ResultOfControlWork {
  constructor(public controlWork: ControlWork, public answersOfOpenQuestion: AnswerInOpenQuestions[], public score: number, public maxScore: number) {}
}
