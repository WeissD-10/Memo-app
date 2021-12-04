import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<IMemo[]>(`${this.env.apiHost}/memo`).pipe(retry(this.retrys), catchError((error) => this.handleError(error)));
  }

  getMemo(id: string): Observable<IMemo> {
    return this.http.get<IMemo>(`${this.env.apiHost}/memo/${id}`).pipe(retry(this.retrys), catchError((error) => this.handleError(error)));
  }

  createMemo(memo: ICreateMemo): Observable<IMemo> {
    return this.http.post<IMemo>(`${this.env.apiHost}/memo`, memo, httpOptions).pipe(retry(this.retrys), catchError((error) => this.handleError(error)));
  }

  updateMemo(memo: IMemo): Observable<IMemo> {
    return this.http.put<IMemo>(`${this.env.apiHost}/memo`, memo, httpOptions).pipe(retry(this.retrys), catchError((error) => this.handleError(error)));
  }

  deleteMemo(id: string): Observable<IMemo> {
    return this.http.delete<IMemo>(`${this.env.apiHost}/memo/${id}`, httpOptions).pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: any): Observable<never> {
    return throwError(`Error: ${error.statusText}, please try again later`);
  }
}
