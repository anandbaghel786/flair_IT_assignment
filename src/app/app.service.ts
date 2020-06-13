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
  constructor(private http: HttpClient) { }

  public authenticateUser(email, password) {
    return this.http.get<User[]>(this.mockUrl + `?email=${email}&password=${password}`, headerOption).subscribe(
      (data: User[]) => {
        this.currentUser = data;
        console.table(this.currentUser);
      });
  }
}
