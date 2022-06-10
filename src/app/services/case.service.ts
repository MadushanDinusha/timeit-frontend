import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  private baseUrl = "https://timeit-apps.herokuapp.com/api/v1"
  // private baseUrl = "https://localhost:8081/api/v1"
  constructor(private httpClient : HttpClient) { }

  saveCase(cases: Object,name: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/saveCase/${name}`, cases,{ responseType: 'text' });
  }

  getAll(name: string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/getAllCases/${name}`);
  }

 
}
