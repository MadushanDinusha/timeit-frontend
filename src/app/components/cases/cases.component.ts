import { DatePipe, } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart, ChartData, ChartEvent, ChartType } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { CaseService } from 'src/app/services/case.service';
import { NavComponent } from '../nav/nav.component';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';
import { WarnSnackbarComponent } from '../warn-snackbar/warn-snackbar.component';

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


@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})

export class CasesComponent implements OnInit {

  case: Case = new Case();
  case2: Case = new Case();
  slaArray : SLA[] =[]
  priority1: number =0
  opriority1: number =0
  priority2: number =0
  opriority2: number=0
  latestReg!:Date;
  oldReg!:Date;
  pipe = new DatePipe('en-US');
  registerForm! : FormGroup;
  latestSla!:number
  latMonthSla :Array<any> =[]
  thisMonthSla :Array<any> =[]
  thisMonthdays : Array<any>=[]
  lastMonthdays : Array<any>=[]
  thisMonthWeeks : Array<any>=[]
  lastMonthWeeks : Array<any>=[]
  returnweeks : Array<any> =[]
  previousMonthWeeks : Array<any>=[]
  date = new Date()
  weekMonthArray : Array<any>=[]
  chart: any;
 

  constructor(private caseService: CaseService, private authService: AuthService,
    private formBuilder: FormBuilder,private _snackBar: MatSnackBar,
    private datePipe: DatePipe, private navcomp:NavComponent) { }

    myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      // Prevent Saturday and Sunday from being selected.
      return day == 5;
    };

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      fPriorityNum: ['', Validators.required],
      fPriorityOldNum:['',Validators.required],
      sPriorityNum:['',Validators.required],
      sPriorityOldNum:['',Validators.required],
      oldestDate:['',Validators.required],
     
  });
  this.getCases()
 
  setTimeout(() => {
    this.navcomp.getLoggedRole()
  }, 1000);

  this.chart = new Chart('canvas', {
    type: 'line',
    data: {
      labels: this.returnweeks,
      datasets: [
        {data:[]}
      ]
    }
    
  });
  }

  canvas: any;
  ctx: any;






  doSubmit(){
    console.log(this.registerForm.value)
    var name = this.authService.getLoggedInUserName();
    console.log(this.registerForm.value.oldestDate)
    this.registerForm.value.weekNumber = Number(this.datePipe.transform(this.registerForm.value.oldestDate,'w'))
    this.caseService.saveCase(this.registerForm.value,name).subscribe((data)=>{
     if(data=="success"){
      this._snackBar.openFromComponent(SuccessSnackbarComponent,{duration:5000})
     }
    },(error)=>{
     
      this._snackBar.openFromComponent(WarnSnackbarComponent,{duration:5000})
    })
    this.registerForm.reset()

  }

   getCases(){
    var name = this.authService.getLoggedInUserName();
    this.caseService.getAll(name).subscribe((data)=>
    {
       data as Case[];
       console.log(data)
       this.latestReg = data[data.length-1].oldestDate
       this.oldReg = data[0].oldestDate
       this.priority1 = Number(data[data.length-1].fPriorityNum)
       this.priority2 = Number(data[data.length-1].sPriorityNum)
       this.opriority1 =  Number(data[data.length-1].fPriorityOldNum)
       this.opriority2 = Number(data[data.length-1].sPriorityOldNum)
      
    this.calculateSLA(data)      
    }
      )

  }

  
  calculateSLA(obj:Case[]){
    var weekarry = []
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
    this.latestSla = this.slaArray[this.slaArray.length-1].sla*100
    this.latestSla = Number(this.latestSla.toFixed(2))
  }

  getWeeklyData(obj:any){
   for(var d of obj){
    if(Number(this.datePipe.transform(this.date,'MM'))==d.month){
      if(this.getMonthFromWeek(d.weekNumber)[0]==d.month){
        this.thisMonthSla.push(d.sla*100)
        this.thisMonthWeeks.push(this.getMonthFromWeek(d.weekNumber)[1])
      }else if(this.getMonthFromWeek(d.weekNumber)[0]==d.month-1){
        this.latMonthSla.push(d.sla*100)
        this.lastMonthWeeks.push(this.getMonthFromWeek(d.weekNumber)[1])
      }
    }else if(Number(this.datePipe.transform(this.date,'MM'))-1==d.month){
      if(this.getMonthFromWeek(d.weekNumber)[0]==d.month){
       this.latMonthSla.push(d.sla*100)
        this.lastMonthWeeks.push(this.getMonthFromWeek(d.weekNumber)[1])
      }
    }
   }
   if(this.thisMonthWeeks.length>=this.lastMonthWeeks.length){
     for(var week of this.thisMonthWeeks){
     this.returnweeks.push(week)
     }
   }else{
     for(var week of this.lastMonthWeeks){
      this.returnweeks.push(week)
     }
   }
   this.chart.data.datasets[0] = { label: 'Last Month', data: this.latMonthSla, tension: 0.5,fill: true }
   this.chart.data.datasets[1] = { label: 'This Month', data: this.thisMonthSla, tension: 0.5,fill: true}
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


}
