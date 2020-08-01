import { Injectable } from '@angular/core';
import { Assessment } from 'src/assets/models/assessment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headerOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};


@Injectable()
export class AssessmentService {


  private AssessentUrl = 'http://localhost:3000/Assessment';

  constructor(private http: HttpClient) { }

  getStudentDatasFromAssessment(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.AssessentUrl , headerOptions);
  }
}

