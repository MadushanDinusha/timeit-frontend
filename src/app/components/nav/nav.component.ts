import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveTaskComponent } from '../save-task/save-task.component';
import { UserComponent } from '../user/user.component';
import { faFile, faUser,faTasks,faHome, faChartPie,faPlane,faTimeline,faLineChart } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit{

  faChartPie=faChartPie;
  faCoffee = faFile;
  fauser = faUser;
  faTasks=faTasks;
  faHome=faHome;
  faplane=faPlane;
  faschdule = faTimeline;
  faLineChart=faLineChart;
  
  @Input('isLoggedIn')
  isLoggedIn :boolean=false;
  
  isAdmin:boolean=false;

  userROle! : string

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    
  constructor(private breakpointObserver: BreakpointObserver, private authService : AuthService,
    private matDialog:MatDialog, private userService:UserService) {}

  ngOnInit(): void {
    
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }
  
  
  handleLogout() {
    
    this.authService.logout();
    this.loadlogout()
  }

  openCreateTask(){
        this.matDialog.open(SaveTaskComponent,
          {panelClass:'task'})
      }

  openCreateUser(){
    this.matDialog.open(UserComponent,{
      panelClass: 'users'
    })
  }

  loadlogout(){
   let user = sessionStorage.getItem("authenticatedUser")
   if (user === null) return false
    else{
      return true
    }}

    getLoggedRole(){
      let a  = sessionStorage.getItem('role')
      console.log(a)
      if(sessionStorage.getItem('role') === "ADMIN"){
        this.isAdmin = true
      }
    }
}
