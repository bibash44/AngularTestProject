import { AssessmentService } from './assessment.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Assessment } from 'src/assets/models/assessment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent {

  constructor(private assessmentService: AssessmentService) { }

  displayedColumns: string[] = ['id', 'student', 'score', 'startDate', 'submittedDate', 'submit'];

  dataSource = new MatTableDataSource();


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit(): void {
    this.getAllAssessments();

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // tslint:disable-next-line: typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  getAllAssessments() {
    this.assessmentService.getStudentDatasFromAssessment().subscribe((data: Assessment[]) => {
      this.dataSource.data = data;
    })
  }

}
