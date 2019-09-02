export class TestModel {
  constructor(public question: string,
              public answers: string[],
              public correctAnswers: number[],
              public id?: number) {}
}
