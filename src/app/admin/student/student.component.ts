import { Student } from './../../../assets/models/student';
import { StudentService } from './student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  public addUpdateStudentFormGroup: FormGroup;
  private id: number;
  public isStudentAdding: boolean;

  private studentDatafromForm: Student;

  public formHeading: string;
  public addOrUpdateStudentbtnText: string;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) {

    this.addUpdateStudentFormGroup = this.formBuilder.group({
      id: [],

      name: ['',
        [
          Validators.required,
          Validators.pattern('[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$')
        ]],

      score: [0,
        [
          Validators.pattern('^[0-9]*$')
        ]],
    });
  }

  displayedColumns: string[] = ['id', 'name', 'score', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('addStudentFormDialouge') StudentFormDialouge: TemplateRef<any>;
  @ViewChild('deleteStudentFormDialouge') deleteStudentFormDialouge: TemplateRef<any>;

  // tslint:disable-next-line: use-lifecycle-interface
  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // tslint:disable-next-line: typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.getAllStudents();
  }



  // Opening dialoguges


  // tslint:disable-next-line: typedef
  openAddStudentDialouge() {
    this.formHeading = 'Add a new student';
    this.addOrUpdateStudentbtnText = ' Add student ';

    this.isStudentAdding = true;

    this.dialog.open(this.StudentFormDialouge);
  }


  // tslint:disable-next-line: typedef
  openStudentDeleteDialouge(studentId: number) {
    this.dialog.open(this.deleteStudentFormDialouge);
    this.id = studentId;
  }



  // tslint:disable-next-line: typedef
  openEdiStudentForm(studentData: Student) {

    this.formHeading = 'Update a student';
    this.addOrUpdateStudentbtnText = 'Update student';

    this.isStudentAdding = false;

    this.addUpdateStudentFormGroup.setValue(studentData)

    this.dialog.open(this.StudentFormDialouge);
  }

  // End of openong dialouges



  // Data manupulaton APIs
  // tslint:disable-next-line: typedef
  getAllStudents() {
    this.studentService.getAllStudents().subscribe((studentsData: Student[]) => {
      this.dataSource.data = studentsData;
    });
  }





  // tslint:disable-next-line: typedef
  deleteStudent() {
    this.studentService.deleteStudent(this.id).subscribe((data: Student) => {
      console.log('Student with id ' + this.id + 'deleted');
      this.getAllStudents();
    });
  }



  // tslint:disable-next-line: typedef
  addOrUpdateStudent() {

    this.studentDatafromForm = this.addUpdateStudentFormGroup.value;

    if (this.isStudentAdding) {
      this.studentService.addStudent(this.studentDatafromForm).subscribe((data: Student) => {
        console.log('data added');
      });
    }
    else {
      this.studentService.updateStudent(this.studentDatafromForm).subscribe((data: Student) => {
        console.log('data updated');
      });
    }



  }

}
