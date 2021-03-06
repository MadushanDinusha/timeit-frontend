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
import { WorkService } from 'src/app/services/work.service';

export interface Task{
  id:number;
  fromDate:Date;
  toDate:Date;
  type:String;
}

export class Work{
  
  shift!:string;
  userId!:number;
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [
    {value: 'Morning', viewValue: '8:00 - 10:00'},
    {value: 'Afternoon', viewValue: '10:00 - 13:00'},
    {value: 'Evening', viewValue: '13:00 - 16:00'},
  ];

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
  displayVal = ""

  constructor(
    private taskService:TaskService,private authService:AuthService, private datepipe: DatePipe,
    private matDialog:MatDialog,private navcomp:NavComponent, private userService:UserService,
    private workService:WorkService) { 
    
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
    this.getValuseForWork()
    this.breakpoint = (window.innerWidth <= 1250) ? 1:2;
    this.width = (window.innerWidth <= 800) ? "450":"750";
    this.width1 = (window.innerWidth <= 800) ? "450":"450";
    this.hight = (window.innerWidth <= 800) ? "250":"200";
  }

  userRole() {
  
    return true;
  }
  
  getValue(value:any){
    var work = new Work()
    work.shift = value;
    this.displayVal = value;
    this.workService.saveWork(work,String(sessionStorage.getItem('authenticatedUser'))).subscribe(data=>{

    })
  }

  getValuseForWork(){
    this.workService.getValuseForWork(String(sessionStorage.getItem('authenticatedUser'))).subscribe(data=>{
      this.displayVal = data.shift;
    })
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
      console.log(res)
      res as Task[];
     if(res.length>0){
      if(this.getTodayTasks1(this.datepipe.transform(res[0].fromDate, 'yyyy-MM-dd'))){
        this.task1Type = res[0].type;
        this.task1StartTime = String(this.formatDate(res[0].fromDate))
        this.task1EndTime = String(this.formatDate(res[0].toDate))
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
    this.width = (event.target.innerWidth <= 800) ? "250":"750";
  }
}
