import { Component, OnInit } from '@angular/core';
import { DifficultyLevel } from './models/difficulty-level.model';
import { Category } from './models/category.model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { QuizService } from './services/quiz.service';
import { ApiCategoriesResponse } from './models/api-categories-response.model';
import { ApiQuestionsResponse } from './models/api-questions-response.model';
import { Question } from './models/question.model';

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

  displayedQuestions: Question[] = [];

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
        this.displayedQuestions = res.results;
        console.log(this.displayedQuestions);
      },
    });
  }

  randomizeAnswers(question: Question): string[] {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    // for (let i = allAnswers.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    // }
    return allAnswers.sort(() => Math.random() - 0.5);
  }
}
