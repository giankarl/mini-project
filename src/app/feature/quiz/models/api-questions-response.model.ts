import { Question } from './question.model';

export interface ApiQuestionsResponse {
  response_code: number;
  results: Question[];
}
