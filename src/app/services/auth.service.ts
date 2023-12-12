import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { } // inject http client

  login(email: string, password: string): Observable<{ message: string, token: string }> { // login function
    return this.http.post<{ message: string, token: string }>('http://localhost:5000/api/login', { // send post request
      email, password // send email and password
    });
  }

  register(user: FormData) {
    return this.http.post('http://localhost:5000/api/register',user)
  }
}
