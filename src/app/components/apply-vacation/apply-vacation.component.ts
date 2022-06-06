import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { VacationService } from 'src/app/services/vacation.service';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';
import { VacationDetailsComponent } from '../vacation-details/vacation-details.component';
import { VacationComponent } from '../vacation/vacation.component';
import { WarnSnackbarComponent } from '../warn-snackbar/warn-snackbar.component';

export interface Vacation{
  toDate: Date
  fromDate: Date
  status : string
  requester: string
} 

@Component({
  selector: 'app-apply-vacation',
  templateUrl: './apply-vacation.component.html',
  styleUrls: ['./apply-vacation.component.css']
})
export class ApplyVacationComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  registerForm!: FormGroup;
  isRole!:boolean;
  thisvari! :string;
  vacationArr : Array<any> =[];

  public dataSource = new MatTableDataSource<Task>()
  displayedColumns: string[] = ['id','fromDate','toDate','status','action'];

  constructor(private formBuilder: FormBuilder,private vacationService: VacationService
    ,private matDialog:MatDialog,private vacationDetails:VacationDetailsComponent,
    private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    if(String(sessionStorage.getItem('role')) === "ADMIN"){
      this.isRole = true;
    }
    this.registerForm = this.formBuilder.group({
      fromDate: ['',Validators.required],
      toDate: ['',Validators.required],
      comment:['']
  });
  this.loadData()
  }

  save(){
   let username = String(sessionStorage.getItem('authenticatedUser'))
   this.vacationService.save(this.registerForm.value,username).subscribe((res)=>
   {
    this._snackBar.openFromComponent(SuccessSnackbarComponent,{duration:5000})
    
   },(error)=>{
    this._snackBar.openFromComponent(WarnSnackbarComponent,{duration:5000})

   })
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  saveStatus(id:any){
    this.getVacationById(id)
     
   
    
  }


  loadData(){
    this.dataSource.data.slice(0,this.dataSource.data.length)
    this.vacationService.getAllPendingTasks()
    .subscribe(res => {
      this.dataSource.data = res as Task[];
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUser(id:number){
    
  }
  getVacationById(id:number){
    
    this.vacationService.getUserByVacation(id).subscribe(data=>{
      this.vacationArr.push(data)
      this.vacationService.getVacationById(id).subscribe(data =>
        {
   
         data as Vacation
         this.vacationArr.push(data)
         this.matDialog.open(VacationDetailsComponent,
           {panelClass:'vacation',
         data:this.vacationArr
         
       } ).afterClosed().subscribe(data=>{

         this.vacationArr = []
         setTimeout(() => {
         this.loadData()
           
         },2000);
       })
       
        }
       )
    })
    
    
  }
}
