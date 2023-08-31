import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { QuizService } from './services/quiz.service';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuizComponent,
      },
    ]),
    DropdownModule,
    FormsModule,
    ButtonModule,
    ToggleButtonModule,
  ],
  providers: [QuizService],
})
export class QuizModule {}
