import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Question } from '../quiz/models/question.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  displayedResults: Question[] = [];
  correctAnswers: number = 0;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(0);

  constructor(private router: Router) {}

  ngOnInit() {
    this.displayedResults = JSON.parse(
      sessionStorage.getItem('questionsWithSelectedAnswers')!
    );
    this.correctAnswers = 0;
    this.displayedResults.forEach((result) => {
      result.all_shuffled_answers?.forEach((answer) => {
        if (answer.selected === true && answer.name === result.correct_answer)
          this.correctAnswers += 1;
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  createNewQuiz() {
    this.router.navigate([`Quiz`]);
  }
}
