import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ResultsComponent,
      },
    ]),
    FormsModule,
    ButtonModule,
    ToggleButtonModule,
  ],
})
export class ResultsModule {}
