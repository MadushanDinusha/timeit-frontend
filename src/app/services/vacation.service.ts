import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private baseUrl = "https://timeit-apps.herokuapp.com/api/v1"
  // private baseUrl = "https://localhost:8081/api/v1"
  constructor(private httpclient:HttpClient) { }

  save(vacation:any,user:string):Observable<any>{
    return this.httpclient.post(`${this.baseUrl}/save/vacation/${user}`,vacation)
  }

  getVacationdays(user:string):Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/getVacationByUser/${user}`)
  }

  getAllPendingTasks(){
    return this.httpclient.get(`${this.baseUrl}/getAllPendingVacation`)
  }
  
  getUserByVacation(id:number):Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/getUserForVacation/${id}`)
  }

  getVacationById(id:number):Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/getVacationById/${id}`)
  }

  updateStatus(status:string,id:number,userId:number):Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/updateStatus/${status}/${id}/${userId}`)
  }

  getPendings():Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/getPending`)
  }

  getVacationDays(name:string):Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/getVacationDays/${name}`)
  }

  getUsersOnVac(){
    return this.httpclient.get(`${this.baseUrl}/userOnVac`)
  }
}
