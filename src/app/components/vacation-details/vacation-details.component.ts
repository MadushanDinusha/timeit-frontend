import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Input } from 'hammerjs';
import { VacationService } from 'src/app/services/vacation.service';
import { ApplyVacationComponent } from '../apply-vacation/apply-vacation.component';
import { NavComponent } from '../nav/nav.component';

export interface Vacation{
  toDate: Date
  fromDate: Date
  status : string
  requester: string
} 


const ELEMENT_DATA: Vacation[] =[]

@Component({
  selector: 'app-vacation-details',
  templateUrl: './vacation-details.component.html',
  styleUrls: ['./vacation-details.component.css'],
  // changeDetection: ChangeDetectionStrategy.Default
})



export class VacationDetailsComponent implements OnInit {

  toDate! : Date
  fromDate! : Date
  status!: string
  username! : string
  dataSource! : any
  arr : Array<any>=[];
  vacationID! : number;

  constructor(private vacationService:VacationService,@Inject(MAT_DIALOG_DATA) public data: any[],
  ) { }

  ngOnInit(): void {
  // this.data[0]
 
  this.username= this.data[0].username
   
    // this.getVacationById(this.vacationID)
    
  }

  removeArray(id:number){
    // this.data = this.data.filter(item => item.id !== id);
    this.data = []
  }

  doSubmit(status:string){
    
    this.vacationService.updateStatus(status,this.data[1].id).subscribe(data=>{
      this.data = []
    })
  }
 

  
}
