import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { VacationService } from 'src/app/services/vacation.service';
import { NavComponent } from '../nav/nav.component';
import { Chart, ChartData, ChartEvent, ChartType } from 'chart.js';
import { CaseService } from 'src/app/services/case.service';
import { DatePipe } from '@angular/common';
import { SaveTaskComponent } from '../save-task/save-task.component';
import { throwIfEmpty } from 'rxjs';

export class Case{
  fPriorityNum! : number;
  fPriorityOldNum! : number;
  sPriorityNum! : number;
  sPriorityOldNum! : number;
  oldestDate! : Date;
  weekNumber! : number;
}

export class SLA{
  sla!: number;
  day!:Date;
  weekNumber!:number
  month!:number
}

export interface User{
  id:string
  username:string;
  fullName:string;

}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  @ViewChild('myButton',{static: true}) myButton! : ElementRef;
  selectedValue!: string;
  chart: any;
  userROle! : string
  isAdmin!:boolean
  tasks!:number
  userCount!:number
  pending!:number
  returnweeks : Array<any> =[]
  latMonthSla :Array<any> =[]
  thisMonthSla :Array<any> =[]
  weekMonthArray:Array<any> =[]
  thisMonthWeeks:Array<any>=[]
  date = new Date()
  lastMonthWeeks:Array<any>=[]
  januarySla:any = []
  last2MonthWeeks:Array<any>=[]
  slaArray:Array<any>=[]
  canvas: any;
  ctx: any;
  users: Array<User> = []
  vacation:number =0
 
  dataSet=[]

  constructor(private navcomp:NavComponent, private userService:UserService, private taskService:TaskService,
    private vacationService: VacationService, private caseService:CaseService,private datePipe: DatePipe,
    private saveTask:SaveTaskComponent) { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ["week1","week2","week3","week4","week5"],
        datasets: [
          {data:[]}
        ]
      }
      
    });
    this.getAllUsers()
  
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
    this.getMonthlyNumberOfTasks();
    this. getNumberOfUsers();
    this.pendingRequest();
  }

  getMonthlyNumberOfTasks(){
    this.taskService.getNumberOfTasks().subscribe(res=>{
      this.tasks = res
    })
  }

  getNumberOfUsers(){
    this.taskService.getUsersCount().subscribe(res=>{
      this.userCount = res
    })
  }

  pendingRequest(){
    this.vacationService.getPendings().subscribe(res=>{
      this.pending = res
    })
  }

  getCases(name:string){
    this.caseService.getAll(name).subscribe((data)=>
    {
       data as Case[];
      this.calculateSLA(data)     

    }
    
      )
  }

  calculateSLA(obj:Case[]){

    for(var d of obj){
      var s = new SLA()
      var totalNew = Number(d.fPriorityNum)+Number(d.sPriorityNum)
      var totalOld = Number(d.fPriorityOldNum)+Number(d.sPriorityOldNum)
      var total = totalNew+totalOld;
      var sla = (total-totalOld)/total
      s.sla = Number(sla.toFixed(2));
      s.day = d.oldestDate
      s.weekNumber = d.weekNumber
      s.month = Number(this.datePipe.transform(d.oldestDate,'MM'))
      this.slaArray.push(s)
    }
    
    this.getWeeklyData(this.slaArray)
    this.slaArray = []

  }

  getWeekNumber(month:Date){
    const d1 = new Date(month)
    var startDate = new Date(d1.getFullYear(), 0, 1);
    var days = Math.floor((Number(d1) - Number(startDate)) /
        (24 * 60 * 60 * 1000));
         
    var weekNumber = Math.ceil(days / 7);
    const firstDay = new Date(d1.getFullYear(), d1.getMonth(), 1).getDay();
    var weekNum =  Math.ceil((d1.getDate() + (firstDay - 1)) / 7);
    return weekNumber;
  }

  getNumberofVacationDays(name:string){
    this.vacationService.getVacationDays(name).subscribe(data=>{
      this.vacation = Number(data)
      console.log(data)
    })
  }


  getWeeklyData(obj:any){
    var jan =[]
    var feb =[]
    var mar =[]
    var apr =[]
    var may =[]
    var jun =[]
    var jul =[]
    var aug =[]
    var sep =[]
    var oct =[]
    var nov =[]
    var dec =[]
    var date;
    for(var d of obj){
    var num =   this.getWeekNumber(d.day)
      
      if( Number(num) == 1){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jan.push(d.sla*100)
      }
      else if( Number(num) == 2){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jan.push(d.sla*100)
      }
      else if( Number(num) == 3){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jan.push(d.sla*100)
      }else if( Number(num) == 4){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jan.push(d.sla*100)
      }else if( Number(num) == 5){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        feb.push(d.sla*100)
      }
      else if( Number(num) == 6){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        feb.push(d.sla*100)
      }
      else if( Number(num) == 7){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        feb.push(d.sla*100)
      }
      else if( Number(num) == 8){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        feb.push(d.sla*100)
      }
      else if( Number(num) == 9){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        mar.push(d.sla*100)
      }
      else if( Number(num) == 10){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        mar.push(d.sla*100)
      }
      else if( Number(num) == 11){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        mar.push(d.sla*100)
      }
      else if( Number(num) == 12){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        mar.push(d.sla*100)
      }
      else if( Number(num) == 13){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        mar.push(d.sla*100)
      }
      else if( Number(num) == 14){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        apr.push(d.sla*100)
      }
      else if( Number(num) == 15){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        apr.push(d.sla*100)
      }
      else if( Number(num) == 16){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        apr.push(d.sla*100)
      }
      else if( Number(num) == 17){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        apr.push(d.sla*100)
      }else if( Number(num) == 18){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        may.push(d.sla*100)
      }
      else if( Number(num) == 19){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        may.push(d.sla*100)
      }
      else if( Number(num) == 20){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        may.push(d.sla*100)
      }
      else if( Number(num) == 21){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        may.push(d.sla*100)
      }
      else if( Number(num) == 22){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jun.push(d.sla*100)
      }
      else if( Number(num) == 23){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jun.push(d.sla*100)
      }
      else if( Number(num) == 24){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jun.push(d.sla*100)
      }else if( Number(num) == 25){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jun.push(d.sla*100)
      }else if( Number(num) == 26){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jun.push(d.sla*100)
      }else if( Number(num) == 27){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jul.push(d.sla*100)
      }else if( Number(num) == 28){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jul.push(d.sla*100)
      }else if( Number(num) == 29){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jul.push(d.sla*100)
      }else if( Number(num) == 30){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        jul.push(d.sla*100)
      }else if( Number(num) == 31){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        aug.push(d.sla*100)
      }else if( Number(num) == 32){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        aug.push(d.sla*100)
      }else if( Number(num) == 33){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        aug.push(d.sla*100)
      }else if( Number(num) == 34){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        aug.push(d.sla*100)
      }else if( Number(num) == 35){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        aug .push(d.sla*100)
      }else if( Number(num) == 36){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        sep .push(d.sla*100)
      }else if( Number(num) == 37){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        sep .push(d.sla*100)
      }
      else if( Number(num) == 38){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        sep .push(d.sla*100)
      }
      else if( Number(num) == 39){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        sep .push(d.sla*100)
      }
      else if( Number(num) == 40){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        oct .push(d.sla*100)
      }else if( Number(num) == 41){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        oct .push(d.sla*100)
      }else if( Number(num) == 42){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        oct .push(d.sla*100)
      }else if( Number(num) == 43){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        oct .push(d.sla*100)
      }else if( Number(num) == 44){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        nov .push(d.sla*100)
      }
      else if( Number(num) == 45){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        nov .push(d.sla*100)
      }
      else if( Number(num) == 46){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        nov .push(d.sla*100)
      }else if( Number(num) == 47){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        nov .push(d.sla*100)
      }else if( Number(num) == 48){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        nov .push(d.sla*100)
      }else if( Number(num) == 49){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        dec .push(d.sla*100)
      }else if( Number(num) == 50){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        dec .push(d.sla*100)
      }else if( Number(num) == 51){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        dec .push(d.sla*100)
      }else if( Number(num) == 52){
        this.getMonthFromWeek(Number(this.getWeekNumber(d.day)))
        dec .push(d.sla*100)
      }





    }
    
    this.chart.data.datasets[0] ={label:"JAN",data:jan}
    this.chart.data.datasets[1] ={label:"FEB",data:feb}
    this.chart.data.datasets[2] ={label:"MAR",data:mar}
    this.chart.data.datasets[3] ={label:"APR",data:apr}
    this.chart.data.datasets[4] ={label:"MAY",data:may}
    this.chart.data.datasets[5] ={label:"JUN",data:jun}
    this.chart.data.datasets[6] ={label:"JUL",data:jul}
    this.chart.data.datasets[7] ={label:"AUG",data:aug}
    this.chart.data.datasets[8] ={label:"SEP",data:sep}
    this.chart.data.datasets[9] ={label:"OCT",data:oct}
    this.chart.data.datasets[10] ={label:"NOV",data:nov}
    this.chart.data.datasets[11] ={label:"DEC",data:dec}
    this.chart.update()
    
   }
   
   getMonthFromWeek(weekNumber :number) {
     
    
     switch(weekNumber){
       case 1:{
         this.weekMonthArray = [1,'week1'];
         break;
       }
       case 2:{
         this.weekMonthArray = [1,'week2']
         break;
       }
       case 3:{
         this.weekMonthArray = [1,'week3']
         break;
       }case 4:{
         this.weekMonthArray = [1,'week4']
         break;
       }
       case 5:{
         this.weekMonthArray = [2,'week1']
         break;
       }
       case 6:{
         this.weekMonthArray = [2,'week2']
         break;
       }
       case 7:{
         this.weekMonthArray = [2,'week3']
         break;
       }
       case 8:{
         this.weekMonthArray = [2,'week4']
         break;
       }
       case 9:{
         this.weekMonthArray = [3,'week1']
         break;
       }
       case 10:{
         this.weekMonthArray = [3,'week2']
         break;
       }
       case 11:{
         this.weekMonthArray = [3,'week3']
         break;
       }
       case 12:{
         this.weekMonthArray = [3,'week4']
         break;
       }
       case 13:{
         this.weekMonthArray = [3,'week5']
         break;
       }
       case 14:{
         this.weekMonthArray = [4,'week1']
         break;
       }
       case 15:{
         this.weekMonthArray = [4,'week2']
         break;
       }case 16:{
         this.weekMonthArray = [4,'week3']
         break;
       }case 17:{
         this.weekMonthArray = [4,'week4']
         break;
       }case 18:{
         this.weekMonthArray = [5,'week1']
         break;
       }case 19:{
         this.weekMonthArray = [5,'week2']
         break;
       }
       case 20:{
         this.weekMonthArray = [5,'week3']
         break;
       }
       case 21:{
         this.weekMonthArray = [5,'week4']
         break;
       }
       case 22:{
         this.weekMonthArray = [6,'week1']
         break;
       }
       case 23:{
         this.weekMonthArray = [6,'week2']
         break;
       }
       case 24:{
         this.weekMonthArray = [6,'week3']
         break;
       }
       case 25:{
         this.weekMonthArray = [6,'week4']
         break;
       }
       case 26:{
         this.weekMonthArray = [6,'week5']
         break;
       }
       case 27:{
         this.weekMonthArray = [7,'week1']
         break;
       }
       case 28:{
         this.weekMonthArray = [7,'week2']
         break;
       }
       case 29:{
         this.weekMonthArray = [7,'week3']
         break;
       }case 30:{
         this.weekMonthArray = [7,'week4']
         break;
       }case 31:{
         this.weekMonthArray = [8,'week1']
         break;
       }case 32:{
         this.weekMonthArray = [8,'week2']
         break;
       }
       case 33:{
         this.weekMonthArray = [8,'week3']
         break;
       }
       case 34:{
         this.weekMonthArray = [8,'week4']
         break;
       }
       case 35:{
         this.weekMonthArray = [8,'week5']
         break;
       }case 36:{
         this.weekMonthArray = [9,'week1']
         break;
       }case 37:{
         this.weekMonthArray = [9,'week2']
         break;
       }case 38:{
         this.weekMonthArray = [9,'week3']
         break;
       }case 39:{
         this.weekMonthArray = [9,'week4']
         break;
       }case 40:{
         this.weekMonthArray = [10,'week1']
         break;
       }case 41:{
         this.weekMonthArray = [10,'week2']
         break;
       }case 42:{
         this.weekMonthArray = [10,'week3']
         break;
       }case 43:{
         this.weekMonthArray = [10,'week4']
         break;
       }case 44:{
         this.weekMonthArray = [11,'week1']
         break;
       }case 45:{
         this.weekMonthArray = [11,'week2']
         break;
       }case 46:{
         this.weekMonthArray = [11,'week3']
         break;
       }case 47:{
         this.weekMonthArray = [11,'week4']
         break;
       }case 48:{
         this.weekMonthArray = [11,'week5']
         break;
       }case 49:{
         this.weekMonthArray = [12,'week1']
         break;
       }case 50:{
         this.weekMonthArray = [12,'week2']
         break;
       }case 51:{
         this.weekMonthArray = [12,'week3']
         break;
       }case 52:{
         this.weekMonthArray = [12,'week4']
         break;
       }
 
 
     }
     return this.weekMonthArray;
   }
 
   getAllUsers(){
    
    this.userService.getAllUsers().subscribe(data=> this.users = data as User[])
  }

  changeUser(user:any){
    this.getCases(user.value);
    this.getNumberofVacationDays(user.value)
  }
}
