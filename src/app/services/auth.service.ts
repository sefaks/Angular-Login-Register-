import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/users';


  constructor(private http: HttpClient) { }

  registerUser(userDetails: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, userDetails).pipe(
      catchError(error => {
        if (error.status === 200) {
          
          return of(null); 
        } else {
         
          return throwError('Registration failed. Please try again later.');
        }
      })
    );
  }
  

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/by-email?email=${email}`);
  }


}