import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class GetUserData {
  private dataUrl = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';

  constructor(private http: HttpClient) {}

getUsers(): Observable<any[]> {
  return this.http.get<any[]>(this.dataUrl)
}
}
