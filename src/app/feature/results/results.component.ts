import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { QuizStateService } from 'src/app/core/services/quiz-state.service';
import { Question } from '../quiz/models/question.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  displayedResults: Question[] = [];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(0);

  constructor(
    private router: Router,
    private quizStateService: QuizStateService
  ) {}

  ngOnInit() {
    this.quizStateService.questionsWithSelectedAnswers
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.displayedResults = res;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  // checkIfIsSelectedAnswerIsWrong(
  //   answer: { name: string; selected: boolean },
  //   result: Question
  // ) {
  //   console.log(result);
  //   if (answer.selected) {
  //     if (answer.name !== result.correct_answer) return true;
  //   } else {
  //     return false;
  //   }
  // }

  createNewQuiz() {
    this.router.navigate([`Quiz`]);
  }
}
