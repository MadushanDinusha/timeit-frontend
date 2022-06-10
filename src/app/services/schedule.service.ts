import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = "https://timeit-apps.herokuapp.com/api/v1"
  // private baseUrl = "https://localhost:8081/api/v1"
  constructor(private httpClient:HttpClient) { }

  addSchedule(cases: Object,name:string) {
    return this.httpClient.post(`${this.baseUrl}/addSchedule/${name}`, cases,{ responseType: 'text' });
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/getAllSchedule`)
  }
}
