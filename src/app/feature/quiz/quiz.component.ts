import { Component, OnInit } from '@angular/core';
import { DifficultyLevel } from './models/difficulty-level.model';
import { Category } from './models/category.model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { QuizService } from './services/quiz.service';
import { ApiCategoriesResponse } from './models/api-categories-response.model';
import { ApiQuestionsResponse } from './models/api-questions-response.model';
import { Question } from './models/question.model';
import { Router } from '@angular/router';

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

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    sessionStorage.removeItem('questionsWithSelectedAnswers');
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
        res.results.map((element) => {
          element.question = this.decodeHtmlEntities(element.question)!;
          element.correct_answer = this.decodeHtmlEntities(
            element.correct_answer
          )!;
          element.incorrect_answers.forEach((incorrect_answer) => {
            incorrect_answer = this.decodeHtmlEntities(incorrect_answer)!;
          });
        });

        this.displayedQuestions = res.results;
        this.displayedQuestions.forEach((question) => {
          question.all_shuffled_answers = this.randomizeAnswers(question);
        });
      },
    });
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
    sessionStorage.setItem(
      'questionsWithSelectedAnswers',
      JSON.stringify(this.displayedQuestions)
    );
    this.router.navigate([`Results`]);
  }

  private decodeHtmlEntities(encodedString: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent;
  }

  private randomizeAnswers(
    question: Question
  ): { name: string; selected: boolean }[] {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];

    return allAnswers
      .sort(() => Math.random() - 0.5)
      .map((answer) => ({
        name: answer,
        selected: false,
      }));
  }
}
