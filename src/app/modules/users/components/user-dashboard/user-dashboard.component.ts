import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ServicesService } from '../../services.service';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;
  currentUserProfile: any = {};
  skilldetail: FormArray;
  submitted = false;
  public empIndex: any;
  public employees: Array<any> = [];
  public byname: String = "";
  public byemail: String = "";
  public isEditMode: boolean = false;
  constructor(private formBuilder: FormBuilder, private appService: AppService) {

  }

  ngAfterViewInit() {
    // this.currentUserProfile = this.appService.currentUserProfile;
  }

  ngOnInit() {
    setTimeout(() => {

    }, 1000);

    console.log(this.appService.currentUserProfile)
    this.employees = JSON.parse(localStorage.getItem("employees")) ? JSON.parse(localStorage.getItem("employees")) : [];
    this.myForm = this.formBuilder.group({
      name: ["", Validators.required],
      age: [0, [Validators.required, Validators.min(1), Validators.max(50)]],
      designation: ["", Validators.required],
      email: ['',
        [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: [' ', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      skilldetail: this.formBuilder.array([this.createItem()])

    }
    )
  }

  get f() { return this.myForm.controls; }
  get t() { return this.f.skilldetail as FormArray; }
  createItem(): FormGroup {
    return this.formBuilder.group({
      skill: ['', [Validators.required]],
      exp: ['', [Validators.required]],
    });
  }

  removeAddress(i) {
    this.skilldetail.removeAt(i);
  }

  addItem(): void {
    this.skilldetail = this.myForm.get('skilldetail') as FormArray;
    this.skilldetail.push(this.createItem());
  }

  public submit() {
    this.submitted = true;
    if (this.myForm.valid) {

      this.byemail = "";
      // console.log(this.isEditMode, rowIndex)
      this.byname = "";

      this.employees.push({
        name: this.myForm.value.name,
        age: this.myForm.value.age,
        designation: this.myForm.value.designation,
        email: this.myForm.value.email,
        phone: this.myForm.value.phone,
        skilldetail: this.myForm.value.skilldetail
      });


      localStorage.setItem('employees', JSON.stringify(this.employees));
      this.employees = JSON.parse(localStorage.getItem("employees"));
      console.log(this.employees);
      this.myForm.reset();
      this.submitted = false;

    }

  }

  public filterData() {
    if (!this.byname && !this.byemail) {
      this.employees = JSON.parse(localStorage.getItem("employees"));
    }
    else {
      this.employees = JSON.parse(localStorage.getItem("employees"));
      this.employees = this.employees.filter(e => e.name == this.byname || e.email == this.byemail)
    }
  }

  public delete(rowIndex: number) {
    this.employees = JSON.parse(localStorage.getItem("employees"));
    this.employees.splice(rowIndex, 1);
    localStorage.removeItem("employees");
    localStorage.setItem('employees', JSON.stringify(this.employees));
    this.employees = JSON.parse(localStorage.getItem("employees"));
    this.myForm.reset();
    this.submitted = false;
  }



  public setData(rowIndex: number) {
    this.submitted = true;
    // this.employees = JSON.parse(localStorage.getItem("employees"));
    let emp = this.employees[rowIndex];

    emp.skilldetail = []
    emp.skilldetail = [{ skill: "aa", exp: 11 }, { skill: "bb", exp: 33 }]
    console.log(emp.phone)
    emp.phone = Number(emp.phone)
    console.log(emp.phone)
    this.myForm.setValue(emp);
    this.empIndex = rowIndex;

  }

  public update(rowIndex: number) {
    if (this.myForm.valid) {
      this.employees[this.empIndex] = this.myForm.value;
      localStorage.setItem('employees', JSON.stringify(this.employees));
      this.employees = JSON.parse(localStorage.getItem("employees"));
      this.isEditMode = false;
      this.myForm.reset();
      this.submitted = false;
    }


  }

}
