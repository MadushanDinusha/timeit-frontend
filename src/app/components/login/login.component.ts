import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string ="";
  password : string="";
  errorMessage = 'Invalid Credentials';
  successMessage: string="";
  invalidLogin = false;
  loginSuccess = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {   }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['home'])
    }
  }

  handleLogin() {

    this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      NavComponent.prototype.isLoggedIn=true;
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';

      this.router.navigate(['home']);
    }, (error) => {
      NavComponent.prototype.isLoggedIn=false;
      this.invalidLogin = true;
      this.loginSuccess = false;
    });   
     
  }

}
