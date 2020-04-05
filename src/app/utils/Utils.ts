import {NgbCalendar, NgbCalendarHebrew, NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class Utils {
  private calendar: NgbCalendar
  constructor() {
    this.calendar = new NgbCalendarHebrew();
  }

  public dayTemplateData(date: NgbDate) {
    return {
      gregorian: (this.calendar as NgbCalendarHebrew).toGregorian(date)
    };
  }
  public getHebDay(date: NgbDate) {
    return {
      hebrewDate: (this.calendar as NgbCalendarHebrew).fromGregorian(date)
    };
  }
}

export const utils = new Utils();
