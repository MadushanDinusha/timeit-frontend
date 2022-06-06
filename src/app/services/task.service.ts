import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private baseUrl = "http://localhost:8081/api/v1"
  
  constructor(private httpClient : HttpClient) { }

  getTasks(name: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getTasks/${name}`);
  }

  getAllTasks(name: string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/getAllTasks/${name}`);
  }
  
  getSession(key: string): any {
    if (typeof window !== 'undefined') {
        let retrievedObject = localStorage.getItem(key) as string;
        return retrievedObject;
    }
  }

  createTask(task: Object,name: string): Observable<Object> {
    console.log(sessionStorage.getItem('btoa'))
    const headers = new HttpHeaders({Authorization : 'Basic '+sessionStorage.getItem('btoa')})
    return this.httpClient.post(`${this.baseUrl}/task/save/${name}`, task,{headers});
  }

  getNumberOftasks(name:string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/task/getNumberOfTasks/${name}`);
  }

  makeTaskDone(task_id:any):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/task/updateTask/${task_id}`);
  }

  getNumberOfTasks():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/getNumberOfTasks`)
  }

  getUsersCount():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/getUserCount`)
  }
}
