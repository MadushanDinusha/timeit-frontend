import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../components/user/user.component';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private baseUrl = "https://timeit-apps.herokuapp.com/api/v1"
  // private baseUrl = "https://localhost:8081/api/v1"
  constructor(private httpclient:HttpClient) { }

  saveWork(work:any, userName:string):Observable<any>{
    return this.httpclient.post(`${this.baseUrl}/saveWork/${userName}`,work)
  }

  getValuseForWork(userName:string):Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/getWorksUser/${userName}`)
  }
}
