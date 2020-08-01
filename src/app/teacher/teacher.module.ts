import { TeacherService } from './teacher.service';
import { NgModule } from '@angular/core';
import { TeacherComponent } from './teacher.component';
import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: TeacherComponent
  }
];

@NgModule({
  declarations: [TeacherComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    TeacherService
  ]
})
export class TeacherModule { }
