import { Component, Input, OnInit } from '@angular/core';
import { faWarning  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-warn-snackbar',
  templateUrl: './warn-snackbar.component.html',
  styleUrls: ['./warn-snackbar.component.css']
})
export class WarnSnackbarComponent implements OnInit {
  faCross=faWarning
  constructor() { }

  ngOnInit(): void {
  }

}
