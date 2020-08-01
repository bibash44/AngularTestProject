import { Assessment } from 'src/assets/models/assessment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from 'src/assets/models/student';

const headerOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable()
export class StudentService {

  private AssessentUrl = 'http://localhost:3000/Assessment';
  private StudentUrl = 'http://localhost:3000/Student';

  constructor(private http: HttpClient) { }


  getSingleStudentData(studentid: number): Observable<Student> {
    return this.http.get<Student>(this.StudentUrl + '/' + studentid, headerOptions);
  }

  getStudentDatasFromAssessment(studentid: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.AssessentUrl + '?student=' + studentid, headerOptions);
  }

  submitAssessmentbyStudent(submittedDate, id: number, studentId: number): Observable<Assessment> {
    return this.http.patch<Assessment>(this.AssessentUrl + '/' + id + '?student=' + studentId, submittedDate, headerOptions);
  }
}
