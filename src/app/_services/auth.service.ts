import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseUrl = environment.apiUrl + 'auth/';
 jwtHelper = new JwtHelperService();
 decodedToken: any;
 private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
constructor(private Http: HttpClient) { }

login(model: any) {
 return this.Http.post(this.baseUrl + 'Login', model).pipe(
   map((response: any) => {
     const user = response;
     if (user) {
       localStorage.setItem('token' , user.token);
       this.decodedToken = this.jwtHelper.decodeToken(user.token);
       this.setCurrentUser(user);
     }
   })
 );
}

setCurrentUser(user: User) {
  localStorage.setItem('user', JSON.stringify(user));
  this.currentUserSource.next(user);
}

register(model: any) {
   return this.Http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

logout() {
  localStorage.removeItem('token');
  this.currentUserSource.next(null);
}
}
