import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiCategoriesResponse } from '../models/api-categories-response.model';
import { ApiQuestionsResponse } from '../models/api-questions-response.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuizCategories(): Observable<ApiCategoriesResponse> {
    return this.http.get<ApiCategoriesResponse>(
      'https://opentdb.com/api_category.php'
    );
  }

  getRelevantQuestions(
    categoryId: string,
    difficultyLevel: string
  ): Observable<ApiQuestionsResponse> {
    return this.http.get<ApiQuestionsResponse>(
      `https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficultyLevel}&type=multiple`
    );
  }
}
