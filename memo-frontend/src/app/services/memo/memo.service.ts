import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { ICreateMemo, IMemo } from 'src/app/interfaces/memo';
import { EnvironmentService } from '../environment/environment.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  private retrys = 3;

  constructor(private http: HttpClient, private env: EnvironmentService) {}

  getMemos(): Observable<IMemo[]> {
    return this.http.get<IMemo[]>(`${this.env.apiHost}/memo`).pipe(this.commonOperators());
  }

  getMemo(id: string): Observable<IMemo> {
    return this.http.get<IMemo>(`${this.env.apiHost}/memo/${id}`).pipe(this.commonOperators());
  }

  createMemo(memo: ICreateMemo): Observable<IMemo> {
    return this.http.post<IMemo>(`${this.env.apiHost}/memo`, memo, httpOptions).pipe(this.commonOperators());
  }

  updateMemo(memo: IMemo): Observable<IMemo> {
    return this.http.put<IMemo>(`${this.env.apiHost}/memo`, memo, httpOptions).pipe(this.commonOperators());
  }

  deleteMemo(id: string): Observable<IMemo> {
    return this.http.delete<IMemo>(`${this.env.apiHost}/memo/${id}`, httpOptions);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(`Error: ${error.statusText}, please try again later`);
  }
  //TODO: Research ways to get rid of any
  /**
   * collection of rxjs operators
   * @returns rxjs operators in common inside this service
   */
  private commonOperators(): any {
    return retry(this.retrys), catchError((error) => this.handleError(error))
  }
}
