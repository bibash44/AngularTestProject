import { Injectable } from '@angular/core';
import { Assessment } from 'src/assets/models/assessment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const headerOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};


@Injectable()
export class AssessmentService {

  private URL = environment.localjsonurl;
  // private URL = environment.onlinejsonurl;
  private AssessentUrl = this.URL + '/Assessment';

  constructor(private http: HttpClient) { }

  getStudentDatasFromAssessment(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.AssessentUrl, headerOptions);
  }
}

