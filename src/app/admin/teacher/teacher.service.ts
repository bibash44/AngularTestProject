
import { Teacher } from './../../../assets/models/teacher';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const headerOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable()
export class TeacherService {

 private URL= 'http://localhost:3000';
//  private URL = 'https://my-json-server.typicode.com/bibash44/jsonapi';
  private AdminTeacherUrl = this.URL + '/Teacher';
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
