import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const resultsGuard = () => {
  const router = inject(Router);

  if (sessionStorage.getItem('questionsWithSelectedAnswers')) {
    return true;
  } else {
    router.navigate(['Quiz']);
    return false;
  }
};
