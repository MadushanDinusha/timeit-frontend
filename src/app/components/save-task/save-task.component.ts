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
import { WorkService } from 'src/app/services/work.service';


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

export class AdminWork{
  shiftType!:string
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
  registerForm2!:FormGroup;
  isLogged:boolean=false;
  isAdmin:boolean=false;

  constructor(private userServic:UserService,private _snackBar:MatSnackBar,
    private taskService:TaskService, private router:Router,private formBuilder: FormBuilder,private authService:AuthService,
    private workService:WorkService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fromDate: ['',Validators.required],
      toDate: ['',Validators.required],
      type: ['',Validators.required],
      fullName:['',Validators.required],
      comment:['']
      
  });
  this.registerForm2 = this.formBuilder.group({
    mon89:[''],tue89:[''],    wed89:[''],    thu89:[''],    fri89:[''],    mon910:[''],    tue910:[''],
    wed910:[''],    thu910:[''],    fri910:[''],    mon1011:[''],    tue1011:[''],    wed1011:[''],    thu1011:[''],    fri1011:[''],
    mon1112:[''],    tue1112:[''],    wed1112:[''],    thu1112:[''],    fri1112:[''],    mon1213:[''],    tue1213:[''],    wed1213:[''],
    thu1213:[''],    fri1213:[''],    mon1314:[''],    tue1314:[''],    wed1314:[''],    thu1314:[''],    fri1314:[''],    mon1415:[''],
    tue1415:[''],    wed1415:[''],    thu1415:[''],    fri1415:[''],    mon1516:[''],    tue1516:[''],    wed1516:[''],    thu1516:[''],
    fri1516:[''],     
  })
  if(sessionStorage.getItem('role') === "ADMIN"){
    this.isAdmin = true
  }
  this.getAllUsers()

  this.isLogged = this.authService.isUserLoggedIn();
  this.getAllAdmin();
  }

  getAllAdmin(){
    this.workService.getAllAdmin().subscribe(data=>{
      console.log(data[0].mon89)
     this.registerForm2.patchValue({
      mon89:   data[0].mon89,
      mon910:  data[0].mon910,
      mon1011: data[0].mon1011,
      mon1112: data[0].mon1112,
      mon1213: data[0].mon1213,
      mon1314: data[0].mon1314,
      mon1415: data[0].mon1415,
      mon1516: data[0].mon1516,
     
      tue89:   data[0].tue89,
      tue910:  data[0].tue910,
      tue1011: data[0].tue1011,
      tue1112: data[0].tue1112,
      tue1213: data[0].tue1213,
      tue1314: data[0].tue1314,
      tue1415: data[0].tue1415,
      tue1516: data[0].tue1516,
     
      wed89:   data[0].wed89,
      wed910:  data[0].wed910,
      wed1011: data[0].wed1011,
      wed1112: data[0].wed1112,
      wed1213: data[0].wed1213,
      wed1314: data[0].wed1314,
      wed1415: data[0].wed1415,
      wed1516: data[0].wed1516,
     
      thu89:   data[0].thu89,
      thu910:  data[0].thu910,
      thu1011: data[0].thu1011,
      thu1112: data[0].thu1112,
      thu1213: data[0].thu1213,
      thu1314: data[0].thu1314,
      thu1415: data[0].thu1415,
      thu1516: data[0].thu1516,
      
      fri89:   data[0].fri89,
      fri910:  data[0].fri910,
      fri1011: data[0].fri1011,
      fri1112: data[0].fri1112,
      fri1213: data[0].fri1213,
      fri1314: data[0].fri1314,
      fri1415: data[0].fri1415,
      fri1516: data[0].fri1516,
     
     })
    })
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
  
  saveSchedule(){
    var adminWork = new AdminWork()
    adminWork = this.registerForm2.value
    this.taskService.saveShedule(adminWork).subscribe(data=>{
      
    })
  }

}


   