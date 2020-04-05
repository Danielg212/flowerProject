import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarHebrew, NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerI18nHebrew,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import {utils, Utils} from '../../../utils/Utils';


@Component({
  selector: 'app-datepicker-hebrew',
  templateUrl: './datepicker-hebrew.component.html',
  styleUrls: ['./datepicker-hebrew.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerHebrewComponent {

  @Output() dateChange = new EventEmitter();

  private _markDays: Array<NgbDateStruct> = new Array<NgbDateStruct>();

  @Input() set markDays(value: Array<NgbDateStruct>) {

     this._markDays = value;

  }

  get markDays(): Array<NgbDateStruct> {

      return this._markDays;

  }

  model: NgbDateStruct;

  constructor(private calendar: NgbCalendar, public i18n: NgbDatepickerI18n) {
    this.dayTemplateData = this.dayTemplateData.bind(this);
    this.model=this.calendar.getToday()
  }

  onDateSelection(ngbDate: NgbDate) {
    this.dateChange.emit(ngbDate)

  }

  dayTemplateData(date: NgbDate) {
    return utils.dayTemplateData(date);
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  isSightDay = (date: NgbDate) =>  {
    if(this.markDays.length){
      return this.markDays.find(t => date.equals(t))
    }
    return
  };

}
