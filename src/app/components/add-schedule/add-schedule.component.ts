import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseService } from 'src/app/services/case.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';
import { ScheduleComponent } from '../schedule/schedule.component';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';
import { WarnSnackbarComponent } from '../warn-snackbar/warn-snackbar.component';

export interface User{
  id:string
  username:string;
  fullName:string;

}

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

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
  
  constructor(private scheduleService:ScheduleService,private _snackBar:MatSnackBar, private formBuilder: FormBuilder,
    private userService:UserService) { }

  ngOnInit(): void {
    this.getAllUsers()
    this.registerForm = this.formBuilder.group({
      fromDate: ['',Validators.required],
      toDate: ['',Validators.required],
      fullName:['',Validators.required],  
      type : ['',Validators.required]
  });

  }


  save(){
    
    if(this.registerForm.value.type==="Phone"){
      if(sessionStorage.getItem("role") == "ADMIN"){
        this.scheduleService.addSchedule(this.registerForm.value,this.registerForm.value.fullName).subscribe((data)=>{
          {
         this._snackBar.openFromComponent(SuccessSnackbarComponent,{duration:5000})
       
         } 
         },(error)=>{
           this._snackBar.openFromComponent(WarnSnackbarComponent,{duration:5000})
         }
         
         );
      }else{
        alert("Only Admins can save Phone tasks")
      }
    }else{
      this.scheduleService.addSchedule(this.registerForm.value,this.registerForm.value.fullName).subscribe((data)=>{
        {
       this._snackBar.openFromComponent(SuccessSnackbarComponent,{duration:5000})
     
       } 
       },(error)=>{
         this._snackBar.openFromComponent(WarnSnackbarComponent,{duration:5000})
       }
       
       );
    }
    
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(data=> this.users = data as User[])
  }

  
}
