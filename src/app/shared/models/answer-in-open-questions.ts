import {OpenQuestionModel} from './open-question.model';

export class AnswerInOpenQuestions {
  constructor(public openQuestion: OpenQuestionModel, public answersOfOpenQuestion: string) {}
}
