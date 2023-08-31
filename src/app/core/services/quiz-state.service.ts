import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from 'src/app/feature/quiz/models/question.model';
@Injectable()
export class QuizStateService {
  public questionsWithSelectedAnswers: BehaviorSubject<Question[]> =
    new BehaviorSubject<Question[]>([]);
}
