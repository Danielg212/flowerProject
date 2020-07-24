import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule, NgbCalendar, NgbCalendarHebrew, NgbDatepickerI18n, NgbDatepickerI18nHebrew} from '@ng-bootstrap/ng-bootstrap';
import { DatepickerHebrewComponent } from './components/dashboard/datepicker-hebrew/datepicker-hebrew.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstinenceDaysCalcComponent } from './components/dashboard/abstinence-days-calc/abstinence-days-calc.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { LoginComponent } from './components/authentication/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import { IntervalsDiaryComponent } from './components/dashboard/intervals-diary/intervals-diary.component';
import { MikvehListComponent } from './components/dashboard/mikveh-list/mikveh-list.component';
import { DayNightpickerComponent } from './components/dashboard/day-night-picker/day-nightpicker.component';



@NgModule({
  declarations: [
    AppComponent,
    DatepickerHebrewComponent,
    AbstinenceDaysCalcComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    IntervalsDiaryComponent,
    MikvehListComponent,
    DayNightpickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    FontAwesomeModule,
    // AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  providers: [AngularFireAuthGuard,
    {provide: NgbCalendar, useClass: NgbCalendarHebrew},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}],
  bootstrap: [AppComponent]
})
export class AppModule { }
