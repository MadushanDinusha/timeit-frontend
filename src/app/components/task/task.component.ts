import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import {ThemePalette} from '@angular/material/core';

export interface Task{
  id:number;
  fromDate:Date;
  toDate:Date;
  type:String;
  active:boolean;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  students!: Observable<Task[]>;
  displayedColumns: string[] = ['id','type','fromDate','toDate','active','done'];
  public dataSource = new MatTableDataSource<Task>()
  searchKey! : String;
  isChecked = true;
  public dataSourceActive = new MatTableDataSource<Task>()

  constructor(private taskService:TaskService,private router: Router,private route: 
    ActivatedRoute,private authService:AuthService) { 
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  loadData(){
  
    var name = this.authService.getLoggedInUserName();
    this.taskService.getAllTasks(name)
    .subscribe(res => {
      this.dataSource.data = res as Task[];
    })
  }

  getActiveData(){
    if(this.isChecked){
      for(var val of this.dataSource.data){
        if(val.active){
          this.dataSourceActive.data.push(val)
        }
      }
      this.dataSource.data=this.dataSourceActive.data
      for(var val1 of this.dataSourceActive.data){
       this.removeItem(val1.id);
      }
    }else{
      this.loadData()
    }
  }
  
  removeItem(id:number){
    this.dataSourceActive.data = this.dataSourceActive.data.filter(item => item.id !== id);

  }
  
  handleLogout() {
    this.authService.logout();
  }

  doDone(id:any){
    this.taskService.makeTaskDone(id).subscribe(res=>{
      this.loadData()
    })
  }
}
