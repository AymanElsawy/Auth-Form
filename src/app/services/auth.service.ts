import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { } // inject http client

  login(email: string, password: string): Observable<{ message: string, token: string }> { // login function
    return this.http.post<{ message: string, token: string }>('https://auth-from.onrender.com/api/login', { // send post request
      email, password // send email and password
    });
  }

  register(user: FormData): Observable<{ message: string, token: string }> {
    return this.http.post<{ message: string, token: string }>('https://auth-from.onrender.com/api/register',user)
  }
}
