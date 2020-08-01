import { element } from 'protractor';
import { Assessment } from 'src/assets/models/assessment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentService } from './student.service';

import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/assets/models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {


  inputStudentId = new FormControl();

  studentid: number;
  studentname: string;
  studentscore: number;

  currentDate1 = new Date(this.getSelectedDateformat());
  currentDate2 = this.currentDate1.getDate();

  assessmentData: Assessment[];

  constructor(private studentService: StudentService) { }

  displayedColumns: string[] = ['id', 'student', 'score', 'startDate', 'submittedDate', 'submit'];

  dataSource = new MatTableDataSource();


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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


  getDoubleDataofStudent() {
    this.getAStudentData();
    this.getStudentAssessment();
  }

  getAStudentData() {
    var id = this.inputStudentId.value;

    this.studentService.getSingleStudentData(id).subscribe((data: Student) => {
      this.studentid = data.id;
      this.studentname = data.name;
      this.studentscore = data.score;

    });
  }

  getStudentAssessment() {
    var id = this.inputStudentId.value;

    this.studentService.getStudentDatasFromAssessment(id).subscribe((data: Assessment[]) => {

      this.dataSource.data = data;
    });
  }

  submitAssessment(assessmentData: Assessment) {

    let date = String(this.getSelectedDateformat());
    let studentid = assessmentData.student;
    let id = assessmentData.id;

    let submittedDate = {
      submittedDate: date
    };

    this.studentService.submitAssessmentbyStudent(submittedDate, id, studentid).subscribe((data: Assessment) => {
      console.log('Submitted');
    })

  }


  getSelectedDateformat() {
    var currentDate = new Date();
    var year = String(currentDate.getFullYear());
    var month = String(currentDate.getMonth() + 1);
    var day = String(currentDate.getDate());

    var date = month + '/' + day + '/' + year;


    return date;
  }


}
