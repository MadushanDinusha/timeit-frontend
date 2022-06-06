import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TaskComponent } from './components/task/task.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeterialModule } from './meterial/meterial/meterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SaveTaskComponent } from './components/save-task/save-task.component';
import { CommonModule, DatePipe } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserComponent } from './components/user/user.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import {  NgChartsModule  } from 'ng2-charts';
import { CasesComponent } from './components/cases/cases.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { VacationComponent } from './components/vacation/vacation.component';
import { WarnSnackbarComponent } from './components/warn-snackbar/warn-snackbar.component';
import { SuccessSnackbarComponent } from './components/success-snackbar/success-snackbar.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './services/auth.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelineDay from '@fullcalendar/resource-timeline';
import { ApplyVacationComponent } from './components/apply-vacation/apply-vacation.component';
import { VacationDetailsComponent } from './components/vacation-details/vacation-details.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AddScheduleComponent } from './components/add-schedule/add-schedule.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';



FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin, resourceTimelineDay]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    ToolbarComponent,
    LoginComponent,
    SaveTaskComponent,
    UserComponent,
    DonutChartComponent,
    CasesComponent,
    ProgressBarComponent,
    VacationComponent,
    WarnSnackbarComponent,
    SuccessSnackbarComponent,
    NavComponent,
    ApplyVacationComponent,
    VacationDetailsComponent,
    ScheduleComponent,
    AddScheduleComponent,
    AnalyticsComponent,
  ],
  imports: [
    
    FullCalendarModule,
    FontAwesomeModule,
    NgChartsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MeterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ],exports:[
    MeterialModule,
  ],
  providers: [DatePipe,AuthService,VacationDetailsComponent,HomeComponent,NavComponent,ScheduleComponent,DonutChartComponent,SaveTaskComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
