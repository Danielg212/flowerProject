import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export interface MonthInterval {
  lastSeenDay: any;
  currentSeeDay: any;
  haflagaInterval: any;
  averageInterval: any;
  monthInterval: any;
  diffDays?: number;
  isLastSeenNight: boolean;
  isCurrentSeenNight: boolean;

}

export interface PeriodDay {
  isSeenNight: boolean;
  seenDay: NgbDate;
}
