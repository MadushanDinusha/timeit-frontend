import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,Input } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../components/user/user.component';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  @Input('header')  header! : HttpHeaders;
 
  user: User = new User();
   private baseUrl = "https://timeit-apps.herokuapp.com/api/v1"
  // private baseUrl = "https://localhost:8081/api/v1"
  constructor(private httpClient : HttpClient) { }

  getUserRole(name: any):Observable<any>{

return this.httpClient.get(`${this.baseUrl}/getRoles/${name}`)

  }

  getAllUsers(): Observable<any>{
    const headers = new HttpHeaders({Authorization : 'Basic '+sessionStorage.getItem('btoa')})
    return this.httpClient.get(`${this.baseUrl}/getUsers`,{headers});
  }

  saveUser(user:User,roles:string):Observable<any>{
    console.log(sessionStorage.getItem('btoa'))
    const headers = new HttpHeaders({Authorization : 'Basic '+sessionStorage.getItem('btoa')})
    return this.httpClient.post(`${this.baseUrl}/user/save/${roles}`,user,{headers})
  }

  getUserNameByFullName(name:string):Observable<any>{
    

    return this.httpClient.get(`${this.baseUrl}/getUsersByUserName/${name}`)
  }

}
