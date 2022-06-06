import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private userService:UserService, private route:Router){}
 
  canActivate() {
    let loggedUser = sessionStorage.getItem('authenticatedUser')
  let  role= String(this.userService.getUserRole(loggedUser).subscribe(res=>console.log(res.roles[0].name)))
    if(role=="ADMIN"){
      return true;
    }else
    return false;
  }
  
}
