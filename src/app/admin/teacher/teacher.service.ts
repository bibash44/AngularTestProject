import { Teacher } from './../../../assets/models/teacher';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headerOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable()
export class TeacherService {

  private AdminTeacherUrl = 'http://localhost:3000/Teacher';
  constructor(private http: HttpClient) { }


  // Method for teachers data manuputaltion for

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.AdminTeacherUrl, headerOptions);
  }

  deleteTeacher(teacherId: number): Observable<Teacher> {
    return this.http.delete<Teacher>(this.AdminTeacherUrl + '/' + teacherId, headerOptions);
  }


  addTeacher(teacherData: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.AdminTeacherUrl, teacherData, headerOptions);
  }

  updateTeacher(teacherData: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(this.AdminTeacherUrl + '/' + teacherData.id, teacherData, headerOptions);
  }
}
