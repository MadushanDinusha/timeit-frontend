import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveTaskComponent } from './components/save-task/save-task.component';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timeit';



  constructor(
    private matDialog:MatDialog,
    private authService:AuthService) { 
    
  }

  isLoggedIn = this.authService.isUserLoggedIn();

  openCreateTask(){
    this.matDialog.open(SaveTaskComponent)
  }

  openCreateUser(){
    this.matDialog.open(UserComponent)
  }

  handleLogout() {
    this.authService.logout();
  }
}
