import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbCalendar, NgbCalendarHebrew, NgbDatepickerI18n, NgbDatepickerI18nHebrew, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatepickerHebrewComponent} from './components/dashboard/datepicker-hebrew/datepicker-hebrew.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AbstinenceDaysCalcComponent} from './components/dashboard/abstinence-days-calc/abstinence-days-calc.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {LoginComponent} from './components/authentication/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HeaderComponent} from './components/dashboard/header/header.component';
import {SidebarComponent} from './components/dashboard/sidebar/sidebar.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {IntervalsDiaryComponent} from './components/dashboard/intervals-diary/intervals-diary.component';
import {MikvehListComponent} from './components/dashboard/mikveh-list/mikveh-list.component';
import {DayNightpickerComponent} from './components/dashboard/day-night-picker/day-nightpicker.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {TorahLessonsComponent} from './components/dashboard/torah-lessons/torah-lessons.component';
import {VideoPlayerComponent} from './components/video-player/video-player.component';
import {AngularFireMessagingModule} from '@angular/fire/messaging';


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
    DayNightpickerComponent,
    TorahLessonsComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    FontAwesomeModule,
    // AngularFireAnalyticsModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
  ],
  providers: [AngularFireAuthGuard,
    {provide: NgbCalendar, useClass: NgbCalendarHebrew},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}],
  bootstrap: [AppComponent]
})
export class AppModule { }
