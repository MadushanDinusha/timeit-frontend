import { DatePipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,

} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { CalendarOptions } from '@fullcalendar/angular';
import {} from '@fullcalendar/interaction'
import { VacationService } from 'src/app/services/vacation.service';
import { ApplyVacationComponent } from '../apply-vacation/apply-vacation.component';
import { NavComponent } from '../nav/nav.component';
import { User } from '../user/user.component';



@Component({
  selector: 'app-vacation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vacation.component.html'
})
export class VacationComponent  {

  dates!:any;
  Events: any[] = [];
  hide=false
  user!: string;
  Datepipe = new DatePipe('en-US');
  event :Array<any> =[]

  @ViewChild('myButton',{static: true}) myButton! : ElementRef;
  
  constructor(private matDialog:MatDialog,private vacationService:VacationService, private navcomp:NavComponent){

  }
  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }

  calendarOptions: CalendarOptions ={
  }

  
  ngOnInit() {
    this.Events.push(this.event)
    this.user = String(sessionStorage.getItem('authenticatedUser'))

    this.getVacationdays()
    
    setTimeout(() => {
      this.navcomp.getLoggedRole()
    }, 1000);
  }

  showdata(){
    // console.log(this.Events)
    this.calendarOptions = {
        
      initialView: 'dayGridMonth',
  dateClick: this.openApplyVacation.bind(this),
  events: this.Events,
    };
  }

  openApplyVacation(){
    this.matDialog.open(ApplyVacationComponent,
      {panelClass:'task'})
  }

  getVacationdays(){
    this.vacationService.getVacationdays(this.user).subscribe((res)=>{
    {
     
      console.log(res)
        this.setStatus(res)}
    })
  }

  setStatus(res:any){
    // this.calendarOptions = {events : [{date: '2022-05-02',display: 'background',backgroundColor:this.colorgreen}]}

    for(let r of res){
      if(r.status==="Completed"){
      let todate = (this.Datepipe.transform(r.toDate,'yyyy-MM-dd'))
      let fromDate = (this.Datepipe.transform(r.fromDate,'yyyy-MM-dd'))
       this.Events.push({start:fromDate,end:todate,display:"background",backgroundColor:"green" })
        // console.log(r)
      }else if(r.status ==="pending"){
        let todate = (this.Datepipe.transform(r.toDate,'yyyy-MM-dd'))
        let fromDate = (this.Datepipe.transform(r.fromDate,'yyyy-MM-dd'))
         this.Events.push({start:fromDate,end:todate,display:"background",backgroundColor:"blue" })
        // console.log("pending"+r)
      }else if(r.status ==="Rejected"){
        let todate = (this.Datepipe.transform(r.toDate,'yyyy-MM-dd'))
        let fromDate = (this.Datepipe.transform(r.fromDate,'yyyy-MM-dd'))
         this.Events.push({start:fromDate,end:todate,display:"background",backgroundColor:"red" })
        // console.log("rejected"+r)
      }
    }
    let el: HTMLElement = this.myButton.nativeElement as HTMLElement;
    // console.log(el)
    setTimeout(()=> el.click(), 500);
  }
  

}
