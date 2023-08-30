export class Question {
  category: string = '';
  correct_answer: string = '';
  difficulty: string = '';
  incorrect_answers: string[] = [];
  question: string = '';
  type: string = '';

  constructor(json: any) {
    if (json) {
      this.category = json.category ?? '';
      this.correct_answer = json.correct_answer ?? '';
      this.difficulty = json.difficulty ?? '';
      this.incorrect_answers = json.incorrect_answers ?? [];
      this.question = json.question ?? '';
      this.type = json.type ?? '';
    }
  }
}