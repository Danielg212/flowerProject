import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export interface MonthInterval {
  lastSeenDay: NgbDateStruct;
  currentSeeDay: NgbDateStruct;
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
