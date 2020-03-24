import { Component, OnInit } from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarHebrew, NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerI18nHebrew,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';


@Component({
  selector: 'app-datepicker-hebrew',
  templateUrl: './datepicker-hebrew.component.html',
  styleUrls: ['./datepicker-hebrew.component.scss'],
  providers: [
    {provide: NgbCalendar, useClass: NgbCalendarHebrew},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}
  ]
})
export class DatepickerHebrewComponent {


  model: NgbDateStruct;

  onatHflagaDate: NgbDate| null = null;
  onatBenonitDate: NgbDate | null = null;
  onatHodeshDate: NgbDate | null = null;

  constructor(private calendar: NgbCalendar, public i18n: NgbDatepickerI18n) {
    this.dayTemplateData = this.dayTemplateData.bind(this);
    this.model=this.calendar.getToday()
  }

  onDateSelection(ngbDate: NgbDate) {
    this.onatHodeshDate = this.calendar.getNext(ngbDate,'m',1)
    this.onatHodeshDate.day=ngbDate.day
    //check if next month date exist
    if(!this.calendar.isValid(this.onatHodeshDate)){

    }      
    // var {gregorian} =this.dayTemplateData(ngbDate)
    // const jsDate = new Date(gregorian.year, gregorian.month, 0);
    // console.log(jsDate)

    this.onatHodeshDate.day = ngbDate.day
    this.onatBenonitDate = this.calendar.getNext(ngbDate,'d',30)

  }

  dayTemplateData(date: NgbDate) {
    return {
      gregorian: (this.calendar as NgbCalendarHebrew).toGregorian(date)
    };
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
