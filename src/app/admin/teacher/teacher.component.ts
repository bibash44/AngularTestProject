import { Teacher } from './../../../assets/models/teacher';
import { TeacherService } from './teacher.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {

  public addUpdateTeacherFormGroup: FormGroup;

  private id: number;
  public isTeacherAdding: boolean;

  private teacherDatafromForm: Teacher;

  public formHeading: string;
  public addOrUpdateTeacherbtnText: string;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private teacherService: TeacherService
  ) {

    this.addUpdateTeacherFormGroup = this.formBuilder.group({
      id: [],

      name: ['',
        [
          Validators.required,
          Validators.pattern('[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$')
        ]],

      class: ['',
        [
          Validators.required,
          Validators.pattern('[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$')
        ]],
    });
  }

  displayedColumns: string[] = ['id', 'name', 'class', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('addTeacherFormDialouge') addUpdateStudentFormDialouge: TemplateRef<any>;
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
    this.getAllTeachers();
  }





  // Data manupulaton APIs
  // tslint:disable-next-line: typedef
  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe((teachertsData: Teacher[]) => {
      this.dataSource.data = teachertsData;
    });
  }


  // OpenDialouge
  // tslint:disable-next-line: typedef
  openTeacherDeleteDialouge(teacherId: number) {
    this.dialog.open(this.deleteTeacherFormDialouge);
    this.id = teacherId;
  }

  // open teacher edit Dialouge
  // tslint:disable-next-line: typedef
  openEdiTeacherDialouge(teacherData: Teacher) {

    this.formHeading = 'Update a teacher';
    this.addOrUpdateTeacherbtnText = 'Update teacher';

    this.isTeacherAdding = false;

    this.addUpdateTeacherFormGroup.setValue(teacherData);

    this.dialog.open(this.addUpdateStudentFormDialouge);
  }



  // tslint:disable-next-line: typedef
  openAddTeacherDialouge() {

    this.formHeading = 'Add a new teacher';
    this.addOrUpdateTeacherbtnText = ' Add teacher ';

    this.addUpdateTeacherFormGroup.controls.id.setValue(null);
    this.addUpdateTeacherFormGroup.controls.name.setValue(null);
    this.addUpdateTeacherFormGroup.controls.class.setValue(null);


    this.isTeacherAdding = true;

    this.dialog.open(this.addUpdateStudentFormDialouge);
  }

  //
  // tslint:disable-next-line: typedef
  deleteTeacher() {
    this.teacherService.deleteTeacher(this.id).subscribe((data: Teacher) => {
      console.log('Teacher with id ' + this.id + 'deleted');
      this.getAllTeachers();
    });
  }

  // tslint:disable-next-line: typedef
  addOrUpdateTeacher() {

    this.teacherDatafromForm = this.addUpdateTeacherFormGroup.value;

    if (this.isTeacherAdding) {
      this.teacherService.addTeacher(this.teacherDatafromForm).subscribe((data: Teacher) => {
        console.log('data added');
      });
    }
    else {
      this.teacherService.updateTeacher(this.teacherDatafromForm).subscribe((data: Teacher) => {
        console.log('data updated');
      });
    }



  }

}
