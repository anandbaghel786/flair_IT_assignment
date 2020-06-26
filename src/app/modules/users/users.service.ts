import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public user: User = {
    id: null,
    username: '',
    age: null,
    gender: '',
    email: '',
    password: '',
    phone: null,
    skilldetail: [
      {
        exam: '',
        marks: null,
        totolmarks: null
      }
    ]
  };

  mockUrl: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }


  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.mockUrl, user, headerOption);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.mockUrl + '/' + user.id, user, headerOption);
  }

}
