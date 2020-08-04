import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbCalendarHebrew, NgbDate, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {utils} from '../../../utils/Utils';
import {MonthInterval, PeriodDay} from '../../../services/MonthInterval.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-abstinence-days-calc',
  templateUrl: './abstinence-days-calc.component.html',
  styleUrls: ['./abstinence-days-calc.component.scss']
})
export class AbstinenceDaysCalcComponent implements OnInit {

  @Output() saveMonth = new EventEmitter<MonthInterval>();

  onatHflagaDate: NgbDate | null = null;
  onatBenonitDate: NgbDate | null = null;
  onatHodeshDate: NgbDate | null = null;
  diffDays: number;
  loading: boolean;

  daysToHiglig: Array<NgbDateStruct> = new Array<NgbDateStruct>();
  private NgbCalendarHebrew: any = new NgbCalendarHebrew();

  lastSeen: PeriodDay = {isSeenNight: false, seenDay: this.calendar.getToday()};
  currentSeen: PeriodDay = {isSeenNight: false, seenDay: this.calendar.getToday()};

  constructor(private calendar: NgbCalendar, public i18n: NgbDatepickerI18n, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.onLastSeenDayChanged( this.lastSeen.seenDay);
    this.onCurrentSeeDayChanged(this.currentSeen.seenDay);
  }

  onLastSeenDayChanged(selectedDate: NgbDate) {
    this.lastSeen.seenDay = selectedDate;
    this.daysToHiglig = [];
    this.daysToHiglig.push(this.lastSeen.seenDay);
    this.daysToHiglig = this.daysToHiglig.slice();
    this.onCurrentSeeDayChanged(this.currentSeen.seenDay);

  }

  onCurrentSeeDayChanged(currentSeeDate: NgbDate) {
    this.currentSeen.seenDay = currentSeeDate;
    this.onatHodeshDate = this.calendar.getNext(currentSeeDate, 'm', 1);
    this.onatHodeshDate.day = currentSeeDate.day;
    // check if next month date exist
    if (!this.calendar.isValid(this.onatHodeshDate)) {

    }
    // var {gregorian} =this.dayTemplateData(ngbDate)
    // const jsDate = new Date(gregorian.year, gregorian.month, 0);
    // console.log(jsDate)

    this.calcOnatHaflaga(currentSeeDate);


  }

  calcOnatHaflaga(currentSeeDate: NgbDate) {
    // ona Benonit: currentSeeDate + 29 days = 30 days (including the seen date)
    this.onatHodeshDate.day = currentSeeDate.day;
    this.onatBenonitDate = this.calendar.getNext(currentSeeDate, 'd', 29);

    const currentSeeDateGeorgian = this.NgbCalendarHebrew.toGregorian(currentSeeDate);
    const lastSeenDayGeorgian = this.NgbCalendarHebrew.toGregorian(this.lastSeen.seenDay);

    const date1: Date = new Date(currentSeeDateGeorgian.year, currentSeeDateGeorgian.month - 1, currentSeeDateGeorgian.day);
    const date2: Date = new Date(lastSeenDayGeorgian.year, lastSeenDayGeorgian.month - 1, lastSeenDayGeorgian.day);

    const diffTime: number = Math.abs(date2.getTime() - date1.getTime());

    // diffDays + 1 in order contain the hebrew format
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    this.diffDays = diffDays;
    // diffDays-1 - includes the currentSeeDate
    this.onatHflagaDate = this.calendar.getNext(currentSeeDate, 'd', diffDays - 1);
  }

  toGergorinDate(dare: any) {
    const {gregorian} = utils.dayTemplateData(dare);
    const jsDate = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
    return jsDate.toLocaleDateString();

  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  saveDate($event) {
    this.loading = true;
    $event.stopPropagation();
    const selectedMonth: MonthInterval = {
      lastSeenDay: {...this.lastSeen.seenDay},
      currentSeeDay: {...this.currentSeen.seenDay},
      haflagaInterval: {...this.onatHflagaDate},
      averageInterval: {...this.onatBenonitDate},
      monthInterval: {...this.onatHodeshDate},
      diffDays: this.diffDays - 1,
      isLastSeenNight: this.lastSeen.isSeenNight,
      isCurrentSeenNight: this.currentSeen.isSeenNight
    } as MonthInterval;


    this.auth.addMonthForIntervalsHistory(selectedMonth).then(
      value => {
        console.log('successfully add the month!');
      }
    ).finally(() => this.loading = false);


    // this.saveMonth.emit(selectedMonth);
  }

  getOnaDayTime(): string {
    return this.currentSeen.isSeenNight ? 'לילה' : 'יום';
  }

  // aaa = () => {
  //   if (this.isLastSeenNight) {
  //     // this.lastSeenDay = this.calendar.getNext(NgbDate.from(this.lastSeenDay), 'd', 1);
  //   } else {
  //     // this.lastSeenDay = this.calendar.getNext(NgbDate.from(this.lastSeenDay), 'd', -1);
  //   }
  //
  // }

  genericOnChange(chk: any) {
    if (chk.isSeenNight) {
      chk.seenDay = this.calendar.getNext(NgbDate.from(chk.seenDay), 'd', 1);
    } else {
      chk.seenDay = this.calendar.getNext(NgbDate.from(chk.seenDay), 'd', -1);

    }

  }
}
