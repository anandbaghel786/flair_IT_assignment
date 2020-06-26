import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { User } from "./models/user.model";
import { Observable } from 'rxjs';
import { tap, timeInterval } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './app.service';
import { timeout } from 'q';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'anguar';


  
  public userLoggedIn: boolean = false;
  public userNotAuth: boolean = false;
  public currentUser: Array<User>;
  public token: String = "";
  usersObservable: Observable<User[]>;
  public loginForm: FormGroup;
  public users: Array<any> = [];
  constructor(private _ngToastService: ToastrService, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private userAuthService: AppService) {

  }

  ngOnInit() {
    this.userLoggedIn = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).token ? true : false;
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", [Validators.required]]
    })
  }

  get f() { return this.loginForm.controls; };

  public login(len, arr) {
    console.log("kjhkjhk")
    this.userAuthService.authenticateUser(this.loginForm.controls["email"].value, this.loginForm.controls["password"].value);
    setTimeout(() => {
      this.currentUser = this.userAuthService.currentUser;
      console.log(this.currentUser[0]);
      if (this.currentUser.length > 0 && (this.currentUser[0].email == this.loginForm.controls["email"].value && this.currentUser[0].password == this.loginForm.controls["password"].value)) {
        console.log("OK");
        for (var i = len; i > 0; i--) {
          this.token +=
            arr[Math.floor(Math.random() * arr.length)];
        }
        console.log(this.token);
        localStorage.setItem('token', JSON.stringify({ token: this.token }));
        localStorage.setItem('currentUserEmail', JSON.stringify({ email: this.loginForm.controls["email"].value }));
        this.httpClient.get("http://localhost:3000/users").subscribe(e => console.log(e))
        this.userLoggedIn = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).token ? true : false;
        console.log(this.userAuthService.currentUserProfile)
        this.router.navigate(["dashboard"]);
        console.log(this.userAuthService.currentUserProfile)
      }
      else {
        this._ngToastService.error('Please enter correct username and password!');
        // alert("Please enter correct username and password");
      }
    }, 1000);

  }

  public registerUser() {
    this.router.navigate(["registration"]);
  }

  public logout() {
    localStorage.removeItem("token");
    this.userLoggedIn = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).token ? true : false;
    this.router.navigate(["home"]);
  }
}
