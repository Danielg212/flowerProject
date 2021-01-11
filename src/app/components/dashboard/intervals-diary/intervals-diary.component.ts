import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {MonthInterval} from '../../../services/MonthInterval.model';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import {UserModel} from '../../../services/User.model';
import {NgbDatepickerI18n, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {utils} from '../../../utils/Utils';
import {bounceAnimation, listAnimation} from '../../../animations/animate';


@Component({
  selector: 'app-intervals-diary',
  templateUrl: './intervals-diary.component.html',
  styleUrls: ['./intervals-diary.component.scss'],
  animations: [listAnimation, bounceAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class IntervalsDiaryComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<UserModel>;
  public selectedInterval: MonthInterval = {} as MonthInterval;
  item: Observable<any> = null;
  // public test: Observable<any[]>;
  private modalRef: NgbModalRef;

  constructor(private auth: AuthService, public i18n: NgbDatepickerI18n, private modalService: NgbModal) {
    // this.itemDoc = auth.getUserIntervalsHistory();
    // this.item = this.itemDoc.valueChanges();

  }

  ngOnInit(): void {
    this.item = this.auth.getUserIntervalsHistory();
  }

  translatNGBDate(date: any): string {
    return this.i18n.getDayAriaLabel(date);
  }

  delete($event: MouseEvent) {
    $event.preventDefault();
    this.modalRef.close();
    console.log('about to delete', this.selectedInterval);
    this.auth.removeMonthForIntervalsHistory(this.selectedInterval);
  }

  getDayTimeStr(b: boolean): string {
    return utils.getDayTimeStr(b);
  }


  openModal($event: MouseEvent, content, interval: MonthInterval) {
    $event.preventDefault();
    this.modalRef = this.modalService.open(content, {windowClass: 'modal-holder', centered: true});
    this.selectedInterval = interval;
  }
}
