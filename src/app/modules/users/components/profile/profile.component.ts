import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../users.service';
import { User } from '../../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  skilldetail: FormArray;
  submitted = false;
  public empIndex: any;
  public employees: Array<any> = [];
  public byname: String = "";
  public byemail: String = "";
  public isEditMode: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersService, private _ngToastService: ToastrService) {

  }

  ngOnInit() {
    this.employees = JSON.parse(localStorage.getItem("employees")) ? JSON.parse(localStorage.getItem("employees")) : [];
    this.userForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: ["", Validators.required],
      age: [null, [Validators.required, Validators.min(18), Validators.max(50)]],
      designation: ["", Validators.required],
      email: ['',
        [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: [' ', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      skilldetail: this.formBuilder.array([this.createItem()])

    }
    )
    console.log(this.employees)
  }

  get f() { return this.userForm.controls; }
  get t() { return this.f.skilldetail as FormArray; }
  createItem(): FormGroup {
    return this.formBuilder.group({
      exam: ['', [Validators.required]],
      marks: [null, [Validators.required]],
      totalmarks: [null, [Validators.required]],
    });
  }

  removeAddress(i) {
    this.skilldetail.removeAt(i);
  }

  addItem(): void {
    this.skilldetail = this.userForm.get('skilldetail') as FormArray;
    this.skilldetail.push(this.createItem());
  }

  createUser() {
    this.userService.createUser(this.userForm.value).subscribe(
      (result: User) => {
        this._ngToastService.success("User registered successfully!");
        this.clearProduct();
        this.router.navigate(["home"])
      });
  }

  updateUser() {
    this.userService.updateUser(this.userForm.value).subscribe(
      (result: User) => {
        // this.toastrService.info('Product updated successfully !', 'Product CRUD');
        this.clearProduct();
        this.isEditMode = false;
        this._ngToastService.success("Profile updated successfully!");
        this.router.navigate(["home"])
      });
  }

  clearProduct() {
    this.userForm.reset();
  }

}
