import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';




@Injectable({
  providedIn: 'root'
})
export class UserService {
 baseUrl = environment.apiUrl;
constructor(private Http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.Http.get<User[]>(this.baseUrl + 'users');
}


getUser(id): Observable<User> {
  return this.Http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User) {
  console.log('user is' + user);
  return this.Http.put(this.baseUrl + 'users/' + id, user);
}

}
