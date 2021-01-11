import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbCalendarHebrew, NgbDate, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {utils} from '../../../utils/Utils';
import {MonthInterval, PeriodDay} from '../../../services/MonthInterval.model';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-abstinence-days-calc',
  templateUrl: './abstinence-days-calc.component.html',
  styleUrls: ['./abstinence-days-calc.component.scss']
})
export class AbstinenceDaysCalcComponent implements OnInit, OnDestroy {

  @Output() saveMonth = new EventEmitter<MonthInterval>();

  private NgbCalendarHebrew: any = new NgbCalendarHebrew();
  private intervalsHistorySub: Subscription;
  onatHflagaDate: NgbDate | null = null;
  onatBenonitDate: NgbDate | null = null;
  onatHodeshDate: NgbDate | null = null;
  diffDays: number;
  loading: boolean;

  daysToHiglig: Array<NgbDateStruct> = new Array<NgbDateStruct>();
  highlightSingleDay: NgbDateStruct = null;

  constInterval: NgbDateStruct | undefined;

  lastSeen: PeriodDay = {isSeenNight: false, seenDay: this.calendar.getToday()};
  currentSeen: PeriodDay = {isSeenNight: false, seenDay: this.calendar.getToday()};
  intervalsHistory: Array<MonthInterval> = [];

  constructor(private calendar: NgbCalendar,
              public i18n: NgbDatepickerI18n,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('on init');
    this.intervalsHistorySub = this.auth.getUserIntervalsHistory()
      .subscribe(
        value => {
          this.initDays(value);
        }, error => {
          console.error('Error! ', error);
        },
        () => {
          this.onCurrentSeeDayChanged(this.currentSeen.seenDay);
          this.onLastSeenDayChanged(this.lastSeen.seenDay);

        });


  }

  ngOnDestroy(): void {
    this.intervalsHistorySub.unsubscribe();
  }

  onLastSeenDayChanged(selectedDate: NgbDate) {
    this.lastSeen.seenDay = selectedDate;
    this.highlightSingleDay = this.lastSeen.seenDay;
    this.onCurrentSeeDayChanged(this.currentSeen.seenDay);

  }

  onCurrentSeeDayChanged(currentSeeDate: NgbDate) {
    this.currentSeen.seenDay = currentSeeDate;
    this.onatHodeshDate = this.calendar.getNext(currentSeeDate, 'm', 1);
    this.onatHodeshDate.day = currentSeeDate.day;
    // check if next month date exist
    if (!this.calendar.isValid(this.onatHodeshDate)) {

    }
    if (this.intervalsHistory.length) {
      this.constInterval = this.hasConstInterval(currentSeeDate);
      // this.isConstInterval = hasConst;
      // this.constInterval = constIntervalDay;
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

  async saveDate($event) {
    this.loading = true;
    $event.stopPropagation();
    const selectedMonth: Partial<MonthInterval> = {
      lastSeenDay: {...this.lastSeen.seenDay},
      currentSeeDay: {...this.currentSeen.seenDay},
      haflagaInterval: {...this.onatHflagaDate},
      averageInterval: {...this.onatBenonitDate},
      monthInterval: {...this.onatHodeshDate},
      diffDays: this.diffDays - 1,
      isLastSeenNight: this.lastSeen.isSeenNight,
      isCurrentSeenNight: this.currentSeen.isSeenNight
    } as MonthInterval;

    // TODO find why addMonthForIntervalsHistory change the onatBenonitDate model

    await this.auth.addMonthForIntervalsHistory(selectedMonth, this.constInterval).then(
      value => {
        console.log('successfully add the month!');
      })
      .catch(reason => console.error(reason))
      .finally(() => {
        this.loading = false;
        this.router.navigate(['diary'], {relativeTo: this.route.parent});

      });


    // this.saveMonth.emit(selectedMonth);
  }

  getOnaDayTime(): string {
    return this.currentSeen.isSeenNight ? 'לילה' : 'יום';
  }

  genericOnChange(chk: any) {
    if (chk.isSeenNight) {
      chk.seenDay = this.calendar.getNext(NgbDate.from(chk.seenDay), 'd', 1);
    } else {
      chk.seenDay = this.calendar.getNext(NgbDate.from(chk.seenDay), 'd', -1);

    }

  }

  private initDays(days: { data: Array<MonthInterval> }) {
    this.intervalsHistory = days.data.slice(0, 4);
    this.daysToHiglig = this.intervalsHistory.reduce((acc, currentValue) =>
      [...acc, currentValue.monthInterval, currentValue.averageInterval, currentValue.haflagaInterval], []);
    if (this.intervalsHistory[0]) {
      this.lastSeen = {
        isSeenNight: this.intervalsHistory[0].isCurrentSeenNight,
        seenDay: NgbDate.from(this.intervalsHistory[0].currentSeeDay)
      };
    }
  }

  private hasConstInterval(selectedDate: NgbDateStruct): NgbDateStruct {
    const lastSeenDate: NgbDateStruct = selectedDate;
    const prevSeenMonth: MonthInterval = this.intervalsHistory[0];
    if (lastSeenDate.day === prevSeenMonth.currentSeeDay.day &&
      lastSeenDate.day === prevSeenMonth.lastSeenDay.day) {
      return lastSeenDate;
    }
  }
}
