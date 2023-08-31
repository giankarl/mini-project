import { Component, OnInit } from '@angular/core';
import { DifficultyLevel } from './models/difficulty-level.model';
import { Category } from './models/category.model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { QuizService } from './services/quiz.service';
import { ApiCategoriesResponse } from './models/api-categories-response.model';
import { ApiQuestionsResponse } from './models/api-questions-response.model';
import { Question } from './models/question.model';
import { Router } from '@angular/router';
import { QuizStateService } from 'src/app/core/services/quiz-state.service';

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

  displaySubmitButton: boolean = false;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(0);

  constructor(
    private quizService: QuizService,
    private router: Router,
    private quizStateService: QuizStateService
  ) {}

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
        this.displayedQuestions.forEach((question) => {
          question.all_shuffled_answers = this.randomizeAnswers(question);
        });
      },
    });
  }

  randomizeAnswers(question: Question): { name: string; selected: boolean }[] {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];

    return allAnswers
      .sort(() => Math.random() - 0.5)
      .map((answer) => ({
        name: answer,
        selected: false,
      }));
  }

  selectAnswer(question: Question, selectedAnswer: string) {
    question.all_shuffled_answers!.forEach(
      (answer: { name: string; selected: boolean }) => {
        if (answer.name !== selectedAnswer) {
          answer.selected = false;
        }
      }
    );

    this.displaySubmitButton = this.displayedQuestions.every((question) =>
      question.all_shuffled_answers?.some((answer) => answer.selected)
    );
  }

  submitQuiz() {
    this.quizStateService.questionsWithSelectedAnswers.next(
      this.displayedQuestions
    );
    this.router.navigate([`Results`]);
  }
}
