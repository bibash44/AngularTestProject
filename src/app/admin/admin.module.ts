import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';
import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent

  }
];


@NgModule({

  declarations: [AdminComponent, StudentComponent, TeacherComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    TeacherService,
    StudentService
  ]
})
export class AdminModule { }
