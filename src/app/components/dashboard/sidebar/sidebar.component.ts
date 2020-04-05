import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {utils} from '../../../utils/Utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private now: Date = new Date();
  public today: NgbDate;

  constructor(public i18n: NgbDatepickerI18n) {
  }

  ngOnInit(): void {
    const ngbDate: NgbDate = new NgbDate(this.now.getFullYear(),
      this.now.getMonth() + 1,
      this.now.getDate());
    this.today = utils.xxx(ngbDate).hebrewDate;
  }

  onClose() {
    document.body.classList.toggle('fullscreen');
  }
}
