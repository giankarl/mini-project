import { Component, OnInit } from '@angular/core';
import { DifficultyLevel } from './models/difficulty-level.model';
import { Category } from './models/category.model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { QuizService } from './services/quiz.service';
import { ApiCategoriesResponse } from './models/api-categories-response.model';
import { ApiQuestionsResponse } from './models/api-questions-response.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  categories: Category[] | undefined;
  selectedCategory: Category | undefined;

  difficultyLevels: DifficultyLevel[] = [
    { name: 'Easy', code: 'E' },
    { name: 'Medium', code: 'M' },
    { name: 'Hard', code: 'H' },
  ];
  selectedDifficultyLevel: DifficultyLevel | undefined;

  displayedQuestions: any;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(0);

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.getQuizCategories();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getQuizCategories() {
    const quizCategories$ = this.quizService.getQuizCategories();
    quizCategories$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (res: ApiCategoriesResponse) => {
        this.categories = res.trivia_categories;
      },
    });
  }

  createQuiz() {
    this.getRelevantQuestions();
  }

  getRelevantQuestions() {
    if (!this.selectedCategory || !this.selectedDifficultyLevel) return;

    const relevantQuestions$ = this.quizService.getRelevantQuestions(
      this.selectedCategory!.id,
      this.selectedDifficultyLevel!.name.toLowerCase()
    );
    relevantQuestions$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (res: ApiQuestionsResponse) => {
        console.log(res);
      },
    });
  }
}
