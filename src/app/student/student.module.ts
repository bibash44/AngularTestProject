import { StudentService } from './student.service';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent
  }
]

@NgModule({
  declarations: [StudentComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule { }
