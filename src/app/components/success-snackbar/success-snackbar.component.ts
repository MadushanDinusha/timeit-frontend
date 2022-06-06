import { Component, OnInit } from '@angular/core';
import { faCheckCircle  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-success-snackbar',
  templateUrl: './success-snackbar.component.html',
  styleUrls: ['./success-snackbar.component.css']
})
export class SuccessSnackbarComponent implements OnInit {
  faCheckCircle=faCheckCircle
  constructor() { }

  ngOnInit(): void {
  }

}
