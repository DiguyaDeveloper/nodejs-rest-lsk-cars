import { Veicule } from './../../admin/models/veicule.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VeiculeService {
  private readonly API_URL = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {}

  postVeicule(body): Observable<Veicule> {
    return this.http
      .post<Veicule>(`${this.API_URL}/veicules/register`, body)
      .pipe(retry(1), catchError(this.handleError));
  }

  getGit() {
    return this.http.get('https://api.github.com/users/DiguyaDeveloper').subscribe((ex) => {
      console.log('');
      debugger;
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
