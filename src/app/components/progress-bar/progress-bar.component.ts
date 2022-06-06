import { keyframes } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { find } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @Input('sla') sla!: number; 

  constructor() { }

  ngOnInit(): void {
  }

}
