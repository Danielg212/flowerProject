import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {utils} from '../../../utils/Utils';


@Component({
  selector: 'app-datepicker-hebrew',
  templateUrl: './datepicker-hebrew.component.html',
  styleUrls: ['./datepicker-hebrew.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerHebrewComponent implements OnInit {

  @Output() dateChange = new EventEmitter();

  private _markDays: Array<NgbDateStruct> = new Array<NgbDateStruct>();

  @Input() set markDays(value: Array<NgbDateStruct>) {

    this._markDays = value;

  }

  get markDays(): Array<NgbDateStruct> {

    return this._markDays;

  }

  @Input() public model: NgbDateStruct = this.calendar.getToday();

  // model: NgbDateStruct;

  constructor(private calendar: NgbCalendar, public i18n: NgbDatepickerI18n) {
    this.dayTemplateData = this.dayTemplateData.bind(this);
  }
  ngOnInit(): void {
  }

  onDateSelection(ngbDate: NgbDate) {
    this.dateChange.emit(ngbDate);

  }

  dayTemplateData(date: NgbDate) {
    return utils.dayTemplateData(date);
  }

  selectToday() {
    this.model = this.calendar.getToday();
    this.dateChange.emit(this.model);
  }

  isSightDay = (date: NgbDate) => {
    if (this.markDays.length) {
      return this.markDays.find(t => date.equals(t));
    }
    return;
  }

}
