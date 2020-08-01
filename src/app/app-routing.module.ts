

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './admin/admin.module#AdminModule'
  },

  {
    path: 'teacher',
    loadChildren: './teacher/teacher.module#TeacherModule'
  },

  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule'
  },

  {
    path: 'assessment',
    loadChildren: './assessment/assessment.module#AssessmentModule'
  },







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
