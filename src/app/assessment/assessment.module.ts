import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AssessmentService } from './assessment.service';
import { NgModule } from '@angular/core';
import { AssessmentComponent } from './assessment.component';

const routes: Routes = [
  {
    path: '',
    component: AssessmentComponent
  }
]

@NgModule({
  declarations: [AssessmentComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    AssessmentService
  ]
})
export class AssessmentModule { }
