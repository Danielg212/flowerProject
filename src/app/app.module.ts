import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule, NgbCalendar, NgbCalendarHebrew, NgbDatepickerI18n, NgbDatepickerI18nHebrew} from '@ng-bootstrap/ng-bootstrap';
import { DatepickerHebrewComponent } from './components/datepicker-hebrew/datepicker-hebrew.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstinenceDaysCalcComponent } from './components/abstinence-days-calc/abstinence-days-calc.component';


@NgModule({
  declarations: [
    AppComponent,
    DatepickerHebrewComponent,
    AbstinenceDaysCalcComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [{provide: NgbCalendar, useClass: NgbCalendarHebrew},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}],
  bootstrap: [AppComponent]
})
export class AppModule { }
