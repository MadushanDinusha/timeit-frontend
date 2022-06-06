import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartEvent, ChartType } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})

export class DonutChartComponent implements OnInit {
  height="";
  width="";
  chart: any;
  dataSet=[]
  mychart : boolean = false;

  @ViewChild('myButton',{static: true}) myButton! : ElementRef;

  
  


  // public doughnutChartLabels: string[] = ;
  // public doughnutChartData: ChartData<'doughnut'> = {
  //   labels: this.doughnutChartLabels,
  //   datasets: []
  // };
  // public doughnutChartType: ChartType = 'doughnut';



  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  

  constructor(private taskService:TaskService, private authService:AuthService){}

  ngOnInit(): void {
    this.getTaskCounts()
    this.height = (window.innerWidth <= 800) ? "100":"150";

    
    this.mychart = true;

      setTimeout(() => {
        
  
 
      }, 1000);
  }



  getTaskCounts(){
    var name = this.authService.getLoggedInUserName();
    this.taskService.getNumberOftasks(name).subscribe(res => {
      this.dataSet = res
     
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: ['Phone','Meeting','BBØ', 'HO', 'Mails','Fri','Syg','Andet'],
          datasets: [
            { 
              data: this.dataSet,
            
            },
          ]
        }
      });
    })
   
  }
  
  onResize(event:any) {
    console.log(event.target.innerWidth)
     this.width = (event.target.innerWidth <= 800) ? "200":"300";
  }

 
}
