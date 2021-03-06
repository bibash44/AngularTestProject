
import { Student } from './../../../assets/models/student';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { config } from 'process';

const headerOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable()
export class StudentService {

  private URL= 'http://localhost:3000';
  // private URL = 'https://my-json-server.typicode.com/bibash44/jsonapi';
  private AdminStudentUrl = this.URL + '/Student';
  constructor(private http: HttpClient) { }


  // Method for students data manuputaltion for

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.AdminStudentUrl, headerOptions);
  }

  deleteStudent(studentId: number): Observable<Student> {
    return this.http.delete<Student>(this.AdminStudentUrl + '/' + studentId, headerOptions);
  }

  addStudent(studentData: Student): Observable<Student> {
    return this.http.post<Student>(this.AdminStudentUrl, studentData, headerOptions);
  }

  updateStudent(studentData: Student): Observable<Student> {
    return this.http.put<Student>(this.AdminStudentUrl + '/' + studentData.id, studentData, headerOptions);
  }

}
