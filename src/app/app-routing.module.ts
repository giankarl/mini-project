import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'Quiz',
        pathMatch: 'full',
      },
      {
        path: 'Quiz',
        loadChildren: () =>
          import('./feature/quiz/quiz.module').then((m) => m.QuizModule),
      },
    ],
  },
  { path: '**', redirectTo: 'Quiz' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
