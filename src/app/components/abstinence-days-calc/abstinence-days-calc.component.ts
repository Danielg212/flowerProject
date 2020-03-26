import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-abstinence-days-calc',
  templateUrl: './abstinence-days-calc.component.html',
  styleUrls: ['./abstinence-days-calc.component.scss']
})
export class AbstinenceDaysCalcComponent implements OnInit {
  model: NgbDateStruct;

  onatHflagaDate: NgbDate| null = null;
  onatBenonitDate: NgbDate | null = null;
  onatHodeshDate: NgbDate | null = null;
  
  constructor(private calendar: NgbCalendar,public i18n: NgbDatepickerI18n) { }

  ngOnInit(): void {
  
  }

  onDateChanged(selectedDate:NgbDate) {
    this.model=selectedDate    
    this.onatHodeshDate = this.calendar.getNext(selectedDate,'m',1)
    this.onatHodeshDate.day=selectedDate.day
    //check if next month date exist
    if(!this.calendar.isValid(this.onatHodeshDate)){

    }      
    // var {gregorian} =this.dayTemplateData(ngbDate)
    // const jsDate = new Date(gregorian.year, gregorian.month, 0);
    // console.log(jsDate)

    this.onatHodeshDate.day = selectedDate.day
    this.onatBenonitDate = this.calendar.getNext(selectedDate,'d',30)
}

}
