import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerI18n, NgbDateStruct, NgbCalendarHebrew } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-abstinence-days-calc',
  templateUrl: './abstinence-days-calc.component.html',
  styleUrls: ['./abstinence-days-calc.component.scss']
})
export class AbstinenceDaysCalcComponent implements OnInit {
  lastSeenDay: NgbDateStruct;
  currentSeeDay: NgbDateStruct;

  onatHflagaDate: NgbDate | null = null;
  onatBenonitDate: NgbDate | null = null;
  onatHodeshDate: NgbDate | null = null;

  daysToHiglig: Array<NgbDateStruct> = new Array<NgbDateStruct>();
  private NgbCalendarHebrew: any = new NgbCalendarHebrew();

  constructor(private calendar: NgbCalendar, public i18n: NgbDatepickerI18n) { }

  ngOnInit(): void {

  }
  onLastSeenDayChanged(selectedDate: NgbDate) {
    this.lastSeenDay = selectedDate
    this.daysToHiglig = []
    this.daysToHiglig.push(this.lastSeenDay);
    this.daysToHiglig = this.daysToHiglig.slice();

  }

  onCurrentSeeDayChanged(currentSeeDate: NgbDate) {
    this.currentSeeDay = currentSeeDate
    this.onatHodeshDate = this.calendar.getNext(currentSeeDate, 'm', 1)
    this.onatHodeshDate.day = currentSeeDate.day
    //check if next month date exist
    if (!this.calendar.isValid(this.onatHodeshDate)) {

    }
    // var {gregorian} =this.dayTemplateData(ngbDate)
    // const jsDate = new Date(gregorian.year, gregorian.month, 0);
    // console.log(jsDate)

    this.calcOnatHaflaga(currentSeeDate)


  }

  calcOnatHaflaga(currentSeeDate: NgbDate) {
    //ona Benonit: currentSeeDate + 29 days = 30 days (including the seen date) 
    this.onatHodeshDate.day = currentSeeDate.day
    this.onatBenonitDate = this.calendar.getNext(currentSeeDate, 'd', 29)

    let currentSeeDateGeorgian = this.NgbCalendarHebrew.toGregorian(currentSeeDate)
    let lastSeenDayGeorgian = this.NgbCalendarHebrew.toGregorian(this.lastSeenDay)

    const date1: any = new Date(currentSeeDateGeorgian.year, currentSeeDateGeorgian.month, currentSeeDateGeorgian.day);
    const date2: any = new Date(lastSeenDayGeorgian.year, lastSeenDayGeorgian.month, lastSeenDayGeorgian.day);

    const diffTime: number = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    //diffDays-1 - includes the currentSeeDate
    this.onatHflagaDate = this.calendar.getNext(currentSeeDate, 'd', diffDays-1)
  }

}
