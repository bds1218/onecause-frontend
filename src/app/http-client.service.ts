import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILoginData } from './login/login.component';

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient) { }

  private readonly url = 'http://localhost:8080';

  public login(data: ILoginData): Observable<any> {
    return this.http.post<ILoginData>(`${this.url}/login`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let res: Error;
    if (error.status === 401) {
      res = new Error('We were unable to find those credentials.');
    } else {
      res = new Error('Something went wrong, please try again.');
    }
    return throwError(() => res);
  }
}
