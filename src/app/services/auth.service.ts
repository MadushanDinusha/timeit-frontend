import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  header! : HttpHeaders;

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  USER_NAME_SESSION_ATTRIBUTE_ID = 'authenticatedUserId'
  public username: string="";
  public password: string="";

  private baseUrl = "https://timeit-apps.herokuapp.com/api/v1"
  // private baseUrl = "https://localhost:8081/api/v1"

  constructor(private http: HttpClient,private userService:UserService) {

  }

  authenticationService(username: string, password: string) {
    
    const headers = new HttpHeaders({Authorization : 'Basic '+btoa(username + ":" + password)})
    sessionStorage.setItem('btoa',btoa(username + ":" + password))
    return this.http.get(`${this.baseUrl}/basicauth`,{headers}).pipe(map((res) => {
     this.username = username;
     this.password = password;
     this.userService.header = headers;
     this.registerSuccessfulLogin(username , password)
  
   }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: string , password: string) {

   sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_ID);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem('btoa')
    sessionStorage.removeItem('role')
    this.username = "";
    this.password = "";
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    
    if (user === null) return false
    else{
      return true

    }
  }
  
  getLoggedInUserId(){
   let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_ID)
   if (user === null) return ''
   return user
   
  }
  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
