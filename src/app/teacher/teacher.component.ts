import { Student } from './../../assets/models/student';
import { Assessment } from './../../assets/models/assessment';
import { Teacher } from './../../assets/models/teacher';
import { TeacherService } from './teacher.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {

  public addUpdateAssessmentFormGroup: FormGroup;
  public addUpdateTeacherFormGroup: FormGroup;

  inputteacherId = new FormControl();
  teacherTableData: Teacher;

  teacherid: number;
  teachername: string;
  teacherclass: string;

  isChecked = false;

  formHeadingText: string;
  formSubmitButtonText: string;
  isAddingAssessment: boolean;


  setAssessementData: Assessment;

  storeStudentData: Student[];

  particularStudentDatas: Assessment[];

  singleStudentData: Student;

  datepicker: any;

  disableRow: boolean;

  constructor(
    private teacherService: TeacherService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {

    this.addUpdateAssessmentFormGroup = this.formBuilder.group({
      id: [],

      student: ['',
        [
          Validators.required,
        ]],

      score: [0,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]],

      startDate: ['',
        [
          Validators.required
        ]],

      submittedDate: [''],
      verified: [this.isChecked],
      excluded: [this.disableRow]
    });

  }





  teacherTableColumn: string[] = ['ID', 'Name', 'Class'];
  displayedColumns: string[] = ['id', 'student', 'score', 'startDate', 'submittedDate', 'verified', 'edit'];

  dataSource = new MatTableDataSource();


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('addAssessmentDialouge') addUpdateAssessmentDialouge: TemplateRef<any>;
  @ViewChild('deleteTeacherFormDialouge') deleteTeacherFormDialouge: TemplateRef<any>;

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

  ngOnInit(): void {

    this.getAllAssessment();
    this.getAllStudents();
  }


  changeVerifyValue() {
    this.isChecked = !this.isChecked;

  }

  openAddUpdateAssessmentForm() {
    this.isAddingAssessment = true;
    this.formHeadingText = 'Add a new assessment';
    this.formSubmitButtonText = 'Add assessmemnt';
    this.dialog.open(this.addUpdateAssessmentDialouge);
  }

  openEditAssessmentForm(assessmentFormData: Assessment) {
    this.addUpdateAssessmentFormGroup.setValue(assessmentFormData);
    this.datepicker = new Date(assessmentFormData.startDate);

    this.isAddingAssessment = false;
    this.formHeadingText = 'Update a assessment';
    this.formSubmitButtonText = 'Update assessmemnt';
    this.dialog.open(this.addUpdateAssessmentDialouge);

  }




  // Api for teahcers
  getATeacher() {
    // tslint:disable-next-line: prefer-const
    var id = this.inputteacherId.value;
    this.teacherService.getaTeacher(id).subscribe((teacherData: Teacher) => {
      this.teacherTableData = teacherData;
      this.teacherid = this.teacherTableData.id;
      this.teachername = this.teacherTableData.name;
      this.teacherclass = this.teacherTableData.class;
    });
  }

  getAllAssessment() {
    this.teacherService.getAllAssessment().subscribe((assessmentData: Assessment[]) => {
      this.dataSource.data = assessmentData;
    });
  }

  getAllStudents() {
    this.teacherService.getAllStudents().subscribe((studentData: Student[]) => {
      this.storeStudentData = studentData;
    });
  }

  addOrUpdateAssessment() {
    let selectedDate = this.getSelectedDateformat();
    this.setAssessementData = this.addUpdateAssessmentFormGroup.value;
    this.setAssessementData.startDate = selectedDate;

    var date1 = new Date(this.getCurrentDate());
    var date2 = new Date(selectedDate);

    var Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if (Difference_In_Days > 7) {
      this.disableRow = true
    }
    else {
      this.disableRow = false;
    }

    this.setAssessementData.excluded = this.disableRow;

    if (this.isAddingAssessment) {
      this.teacherService.addNewAssessment(this.setAssessementData).subscribe((data: Assessment) => {
        console.log(data + 'new data added');
      });
    }
    else {
      this.teacherService.updateAssessment(this.setAssessementData).subscribe((data: Assessment) => {
        console.log(data + ' updated');
        if (data.verified) {
          this.increaseStudentOverAllScore(this.setAssessementData.student);
        }
      });
    }

  }

  verifyAssessment(assessmentVerified: Assessment) {
    assessmentVerified.verified = true;
    assessmentVerified.score = 100;
    this.teacherService.verifyAssessment(assessmentVerified).subscribe((data: Assessment) => {

      if (data.verified) {
        this.increaseStudentOverAllScore(assessmentVerified.student);
      }
    });

  }

  increaseStudentOverAllScore(studentid: number) {


    this.teacherService.getParctularDataofStudentFromAssessment(studentid).subscribe((data: Assessment[]) => {
      this.particularStudentDatas = data;
      let calculateScore: number = 0;
      this.particularStudentDatas.forEach(element => {
        calculateScore += Number(element.score);
      });

      let score = {
        score: calculateScore
      };

      this.teacherService.increseOverallScoreOfStudent(studentid, score).subscribe((data: Student) => {
        console.log(' overall score increased');
      })


    });

  }



  getSelectedDateformat() {
    var selectedDate = this.addUpdateAssessmentFormGroup.controls.startDate.value;
    var year = String(selectedDate.getFullYear());
    var month = String(selectedDate.getMonth() + 1);
    var day = String(selectedDate.getDate());

    var date = month + '/' + day + '/' + year;

    return date;
  }


  getCurrentDate() {
    var selectedDate = new Date();
    var year = String(selectedDate.getFullYear());
    var month = String(selectedDate.getMonth() + 1);
    var day = String(selectedDate.getDate());

    var date = month + '/' + day + '/' + year;

    return date;
  }

}
