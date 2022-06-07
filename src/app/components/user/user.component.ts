import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


interface Roles{
 value:string;
 viewValue:string;
}
export class User{
  username!:string;
  fullName!:string;
  password!:string;
  email!:string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  registerForm!: FormGroup;
  errorCpass!:boolean;

  constructor(private userService:UserService,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router:Router) { }
  submitted=false;
  user: User = new User();
  roles!:string;
  confirmPassword!:string;
  isMatch:boolean = false;
  isLogged:boolean=false;
  USER_NAME_SESSION_ATTRIBUTE_NAME='';

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['',Validators.required],
      fullName: ['',Validators.required],
      password: ['',Validators.required],
      email: ['',Validators.required],
      cpassword:['',Validators.required],
      role:['',Validators.required]
  });
  }

  role: Roles[] = [
    {value: 'ADMIN', viewValue: 'Admin'},
    {value: 'USER', viewValue: 'User'},
    
  ];

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  conformPassWord(){
    if(this.confirmPassword === this.user.password){
      this.isMatch = true;
      return this.isMatch;
    }else{
      this.isMatch = false;
      return this.isMatch;
    }
  }
get f() { return this.registerForm.controls; }

  onPasswordChange() {
    if (this.registerForm.value.password== this.registerForm.value.cpassword)
     this.errorCpass = false;
    else
    this.errorCpass = true;

  }


  saveuser(){
  
    this.userService.saveUser(this.registerForm.value,this.registerForm.value.role).subscribe(
      
    )
  }

}
