import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CasesComponent } from './components/cases/cases.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TaskComponent } from './components/task/task.component';
import { AuthGuard } from './shared/auth.guard';
import { SaveTaskComponent } from './components/save-task/save-task.component';
import { RoleGuard } from './shared/role.guard';
import { VacationComponent } from './components/vacation/vacation.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
// import { MainNavComponent } from './main-nav/main-nav.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  {path: 'dashboard', component: HomeComponent},
  {path: 'task',component:TaskComponent,canActivate:[AuthGuard]},
  {path: 'logout', component: LoginComponent},
  {path: 'case', component: CasesComponent},
  {path: 'case',component: CasesComponent},
  {path: 'vacation',component:VacationComponent},
  {path: 'schedule',component:ScheduleComponent},
  {path: 'analytics',component:AnalyticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
