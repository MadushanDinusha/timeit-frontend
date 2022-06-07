import { DatePipe } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { NavComponent } from '../nav/nav.component';
import { SaveTaskComponent } from '../save-task/save-task.component';
import { TaskComponent } from '../task/task.component';
import * as moment from "moment";

export interface Task{
  id:number;
  fromDate:Date;
  toDate:Date;
  type:String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName =sessionStorage.getItem('authenticatedUser')
  task1StartTime = ""
  task1EndTime = ""
  task2StartTime = ""
  task2EndTime = ""
  task1Type=""
  task2Type=""
  isTodayTask1=false;
  isTodayTask2=false;
  myDate = new Date();
  USER_NAME_SESSION_ATTRIBUTE_NAME='';
  breakpoint :any;
  userROle! : string
  isAdmin!:boolean
  width = ""
  width1 = ""
  hight=""
  constructor(
    private taskService:TaskService,private authService:AuthService, private datepipe: DatePipe,
    private matDialog:MatDialog,private navcomp:NavComponent, private userService:UserService) { 
    
  }

  ngOnInit(): void {
    // this.navcomp.reloadPage()
    let loggedUser = sessionStorage.getItem('authenticatedUser')
    if(loggedUser!=null){
      this.userService.getUserRole(loggedUser).subscribe((res)=>{
        this.userROle = res.roles[0].name
        sessionStorage.setItem("role",this.userROle)        
        if(this.userROle == "ADMIN"){
          this.isAdmin =true
        }else{
          this.isAdmin =false;
        }
      }
      )
    }
    setTimeout(() => {
      this.navcomp.getLoggedRole()
    }, 1000);
    this.getNextTasks()
    this.breakpoint = (window.innerWidth <= 1250) ? 1:2;
    this.width = (window.innerWidth <= 800) ? "450":"750";
    this.width1 = (window.innerWidth <= 800) ? "450":"450";
    this.hight = (window.innerWidth <= 800) ? "250":"200";
  }

  userRole() {
  
    return true;
  }
  

  openCreateTask(){
    this.matDialog.open(SaveTaskComponent)
  }

  getTodayTasks1(date:any){
   let today = this.datepipe.transform(this.myDate,'yyyy-MM-dd')
  if(today==date){
    this.isTodayTask1=true
   return true ;
  }
  else{
    this.isTodayTask1=false;
    return false;
  }
  }

  getTodayTasks2(date:any){
    let today = this.datepipe.transform(this.myDate,'yyyy-MM-dd')
   if(today==date){
    return this.isTodayTask2=true;
   }
   else{
     return this.isTodayTask2=false;
   }
   }

  formatDate(date: Date){
   let d =  new Date(date);
    return d.toUTCString();
  }

  getNextTasks(){
    var name = this.authService.getLoggedInUserName()
    this.taskService.getTasks(name)
    .subscribe(res => {
      res as Task[];
      console.log(res)
     if(res.length>0){
      if(this.getTodayTasks1(this.datepipe.transform(res[0].fromDate, 'yyyy-MM-dd'))){
        this.task1Type = res[0].type;
        this.task1StartTime = String(this.formatDate(res[0].fromDate))
        this.task1EndTime = String(this.formatDate(res[0].toDate))
        console.log(this.task1StartTime +" ss "+this.task1EndTime)
      }}
      if(res.length > 1){
        if(this.getTodayTasks2(this.datepipe.transform(res[1].fromDate, 'yyyy-MM-dd'))){
          this.task2Type = res[1].type;
        this.task2StartTime = String(this.formatDate(res[1].fromDate))
        this.task2EndTime = String(this.formatDate(res[1].toDate))
        }
      }
    })
  }
  
  go(){
    this.matDialog.open(TaskComponent,{
      panelClass: 'all-tasks'
    })
  }

  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 1250) ? 1:2;
  }

  onResizediv(event:any) {
    this.width = (event.target.innerWidth <= 800) ? "250":"450";
  }
}
