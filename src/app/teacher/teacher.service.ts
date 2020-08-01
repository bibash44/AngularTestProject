import { Assessment } from './../../assets/models/assessment';
import { Student } from './../../assets/models/student';
import { Teacher } from './../../assets/models/teacher';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headerOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable()
export class TeacherService {


  private TeacherUrl = 'http://localhost:3000/Teacher';
  private AssessentUrl = 'http://localhost:3000/Assessment';
  private StudentUrl = 'http://localhost:3000/Student';

  constructor(private http: HttpClient) { }


  getaTeacher(teacherId: number): Observable<Teacher> {
    return this.http.get<Teacher>(this.TeacherUrl + '/' + teacherId, headerOptions);
  }

  getAllAssessment(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.AssessentUrl, headerOptions);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.StudentUrl, headerOptions);
  }

  addNewAssessment(assessmentData: Assessment): Observable<Assessment> {
    return this.http.post<Assessment>(this.AssessentUrl, assessmentData, headerOptions);
  }

  verifyAssessment(assementData: Assessment): Observable<Assessment> {
    return this.http.put<Assessment>(this.AssessentUrl + '/' + assementData.id, assementData, headerOptions);
  }

  updateAssessment(assmentData: Assessment): Observable<Assessment> {
    return this.http.put<Assessment>(this.AssessentUrl + '/' + assmentData.id, assmentData, headerOptions);
  }

  getParctularDataofStudentFromAssessment(studentid: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.AssessentUrl + '?student=' + studentid, headerOptions);
  }

  getSingleStudentFormStudent(studentid: number): Observable<Student> {
    return this.http.get<Student>(this.StudentUrl + '/' + studentid, headerOptions);
  }

  increseOverallScoreOfStudent(studentId: number, score): Observable<Student> {
    return this.http.patch<Student>(this.StudentUrl + '/' + studentId, score, headerOptions);
  }

}
