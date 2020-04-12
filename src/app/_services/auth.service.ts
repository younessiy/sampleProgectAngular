import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseUrl = 'https://localhost:44367/api/auth/';
 jwtHelper = new JwtHelperService();
 decodedToken: any;
constructor(private Http: HttpClient) { }

login(model: any) {
 return this.Http.post(this.baseUrl + 'Login', model).pipe(
   map((response: any) => {
     const user = response;
     if (user) {
       localStorage.setItem('token' , user.token);
       this.decodedToken = this.jwtHelper.decodeToken(user.token);
     }
   })
 );
}

register(model: any) {
   return this.Http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
}
