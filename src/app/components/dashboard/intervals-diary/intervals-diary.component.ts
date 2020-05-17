import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Observable, of} from 'rxjs';
import {MonthInterval} from '../../../services/MonthInterval.model';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import {UserModel} from '../../../services/User.model';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-intervals-diary',
  templateUrl: './intervals-diary.component.html',
  styleUrls: ['./intervals-diary.component.scss']
})
export class IntervalsDiaryComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<UserModel>;
  item: Observable<UserModel> = null;

  constructor(private auth: AuthService, public i18n: NgbDatepickerI18n) {

    // this.itemDoc = auth.getUserIntervalsHistory();
    // this.item = this.itemDoc.valueChanges();

  }

  ngOnInit(): void {
    this.itemDoc = this.auth.getUserIntervalsHistory();
    this.item = this.itemDoc.valueChanges();
//     this.auth.userData$.subscribe(
//       value1 => {
//         console.log(value1.intervalHistory);
//       }
//     );

  }

  translatNGBDate(date: any): string {
    return this.i18n.getDayAriaLabel(date);
  }

  delete($event: MouseEvent, interval: MonthInterval) {
    $event.preventDefault();
    console.log('about to delete', interval);
    this.auth.removeMonthForIntervalsHistory(interval);
  }
}
