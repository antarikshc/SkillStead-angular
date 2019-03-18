import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  hitLogin(email: string, password: string) {
    return this.http.post(
      'http://localhost:4040/users/login',
      {
        email,
        password
      });
  }

  hitSignUp(name: string, email: string, password: string) {
    return this.http.post(
      'http://localhost:4040/users/signup',
      {
        name,
        email,
        password
      });
  }
}
