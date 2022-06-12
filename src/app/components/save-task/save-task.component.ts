import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, _SnackBarContainer } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';
import { WarnSnackbarComponent } from '../warn-snackbar/warn-snackbar.component';
import { HomeComponent } from '../home/home.component';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface User{
  id:string
  username:string;
  fullName:string;

}

interface Type {
  value: string;
  viewValue: string;
}

export class Task{
  fromDate!:String;
  toDate!:String;
  type!:String;
  username!:string;
  comment!:string;
}


@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})

export class SaveTaskComponent implements OnInit {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  task: Task = new Task();
  submitted = false;
  myDatePickerFrom=''
  myDatePickerTo=''

  types: Type[] = [
    {value: 'Phone', viewValue: 'Phone'},
    {value: 'Meeting', viewValue: 'Meeting'},
    {value: 'BBØ', viewValue: 'BBØ'},
    {value: 'HO', viewValue: 'HO'},
    {value: 'Mails', viewValue: 'Mails'},
    {value: 'Fri', viewValue: 'Fri'},
    {value: 'Syg', viewValue: 'Syg'},
    {value: 'Andet', viewValue: 'Andet'},
  ];

  users: Array<User> = []

  registerForm!: FormGroup;
  isLogged:boolean=false;

  constructor(private userServic:UserService,private _snackBar:MatSnackBar,
    private taskService:TaskService, private router:Router,private formBuilder: FormBuilder,private authService:AuthService,
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fromDate: ['',Validators.required],
      toDate: ['',Validators.required],
      type: ['',Validators.required],
      fullName:['',Validators.required],
      comment:['']
      
  });

  this.getAllUsers()

  this.isLogged = this.authService.isUserLoggedIn();
  
  }

  getAllUsers(){
    this.userServic.getAllUsers().subscribe(data=> this.users = data as User[])
  }


  save(){
    var name = this.authService.getLoggedInUserName();
    if(this.registerForm.value.type==="Phone"){
      if(sessionStorage.getItem("role") == "ADMIN"){
    this.taskService.createTask(this.registerForm.value,this.registerForm.value.fullName)
      .subscribe((data)=>{
       {
        this._snackBar.openFromComponent(SuccessSnackbarComponent,{duration:5000})
       }
      },(error)=>{
       
        this._snackBar.openFromComponent(WarnSnackbarComponent,{duration:5000})
      })
  }else{
    alert("Only Admins can save Phone tasks")
  }
}else{
  this.taskService.createTask(this.registerForm.value,this.registerForm.value.fullName)
      .subscribe((data)=>{
    {
   this._snackBar.openFromComponent(SuccessSnackbarComponent,{duration:5000})
 
   } 
   },(error)=>{
     this._snackBar.openFromComponent(WarnSnackbarComponent,{duration:5000})
   }
   
   ); 
}

}

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
  }
    this.save();   
  }
  


}
