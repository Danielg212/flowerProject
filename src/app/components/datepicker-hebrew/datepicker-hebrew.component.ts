import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
})
export class DatepickerHebrewComponent {

  @Output() dateChange = new EventEmitter();

  model: NgbDateStruct;

  constructor(private calendar: NgbCalendar, public i18n: NgbDatepickerI18n) {
    this.dayTemplateData = this.dayTemplateData.bind(this);
    this.model=this.calendar.getToday()
  }

  onDateSelection(ngbDate: NgbDate) {
    this.dateChange.emit(ngbDate)

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
