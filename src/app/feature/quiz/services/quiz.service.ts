import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuizCategories(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://opentdb.com/api_category.php');
  }
}
