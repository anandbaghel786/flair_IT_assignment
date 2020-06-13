import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {
  mockUrl: string = 'http://localhost:3000/users';
  public currentUser: Array<User>;
  public currentUserProfile: {};
  constructor(private http: HttpClient) {
    if (JSON.parse(localStorage.getItem("currentUserEmail")) && JSON.parse(localStorage.getItem("currentUserEmail")).email)
      this.getCurrentUserProfile();
  }

  public authenticateUser(email, password) {
    return this.http.get<User[]>(this.mockUrl + `?email=${email}&password=${password}`, headerOption).subscribe(
      (data: User[]) => {
        this.currentUser = data;
        this.currentUserProfile = this.currentUser[0];
        console.table("gggggggggggggg");
      });
  }

  public getCurrentUserProfile() {

    this.http.get<User[]>(this.mockUrl + `?email=${JSON.parse(localStorage.getItem("currentUserEmail")).email}`, headerOption).subscribe(
      (data: User[]) => {
        this.currentUser = data;
        this.currentUserProfile = this.currentUser[0];
        console.table("gggggggggggggg");
      });

  }
}
