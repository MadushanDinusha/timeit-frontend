import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';
import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import Tooltip from 'tooltip.js'; 
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  userROle! : string
  isAdmin!:boolean
  Datepipe = new DatePipe('en-US');
  Events: any[] = [];
  Resources: any[] = [];
  @ViewChild('myButton',{static: true}) myButton! : ElementRef;
  
  constructor(private userService:UserService, private matDialog:MatDialog, private scheduleService:ScheduleService,
    private navcomp:NavComponent ) { }

  ngOnInit(): void {
   
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
    this.getAllSchdules()
  }

  addTime(){
    this.matDialog.open(AddScheduleComponent)
  }

  calendarOptions: CalendarOptions ={
    initialView: 'resourceTimelineDay',
    height:200
  }

  getAllSchdules(){
    this.scheduleService.getAll().subscribe(data=>{
      this.setSchedule(data)
    })
  }

  showdata(){

    this.calendarOptions = {
    height:350,
    timeZone: 'UTC',
    aspectRatio: 1.5,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
    },
    editable: true,
    dateClick:this.addTime.bind(this),
    eventMouseEnter: function(info) {
      var t = new Tooltip(info.el, {
        
        title: (JSON.stringify(info.event.start)).substring(12,17) +" - "+ (JSON.stringify(info.event.end)).substring(12,17) + " - " +(JSON.stringify(info.event.title)),
        placement: 'top',
        trigger: 'hover',
        container: 'body',
      });
      setTimeout(() => {
        t.dispose()
      }, 1500);
     
    },
    eventMouseLeave:function(info){
      var t = new Tooltip(info.el, {
        
        title: (JSON.stringify(info.event.start)).substring(12,17) +" - "+ (JSON.stringify(info.event.end)).substring(12,17) + " - " +(JSON.stringify(info.event.title)),
        placement: 'top',
        trigger: 'hover',
        container: 'body',
      });
      t.dispose()
    },
    resourceAreaHeaderContent: 'Employee',
    resources: this.Resources,
    events: this.Events,
    };
  }

  formatDate(date: Date){
    let d =  new Date(date);
    d.setHours(d.getHours()-3)
     return d.toUTCString();
   }
 

  setSchedule(res:any){

    for(let r of res){
      this.Resources.push({id: r.user.username,title: r.user.fullName})
      let todate = (this.Datepipe.transform(this.formatDate(r.toDate),'yyyy-MM-dd HH:mm'))
      let fromDate = (this.Datepipe.transform(this.formatDate(r.fromDate),'yyyy-MM-dd HH:mm'))
      if(r.type=="Phone"){

        this.Events.push({title:r.type,resourceIds: [r.user.username], start:fromDate,end:todate, color:"blue" })
      }else if(r.type =="Meeting"){

        this.Events.push({title:r.type,resourceIds: [r.user.username], start:fromDate,end:todate, color:"red" })
      }else if(r.type=="BBØ"){

        this.Events.push({title:r.type,resourceIds: [r.user.username], start:fromDate,end:todate, color:"green" })
      }else if(r.type=="HO"){

        this.Events.push({title:r.type,resourceIds: [r.user.username], start:fromDate,end:todate, color:"yellow" })
      }else if(r.type=="Mails"){

        this.Events.push({title:r.type,resourceIds: [r.user.username], start:fromDate,end:todate, color:"orange" })
      }else if(r.type=="Fri"){

        this.Events.push({title:r.type,resourceIds: [r.user.username], start:fromDate,end:todate, color:"black" })
      }else if(r.type=="Syg"){

        this.Events.push({title:r.type,resourceIds: [r.user.username], start:fromDate,end:todate, color:"pink" })
      }else if(r.type=="Andet"){

        this.Events.push({title:r.type,resourceIds: [r.user.username], start:fromDate,end:todate, color:"purple" })
      }
  
    }
    let el: HTMLElement = this.myButton.nativeElement as HTMLElement;

    setTimeout(()=> el.click(), 500);
  }
}
