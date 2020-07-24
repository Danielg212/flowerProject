import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-day-nightpicker',
  templateUrl: './day-nightpicker.component.html',
  styleUrls: ['./day-nightpicker.component.scss']
})
export class DayNightpickerComponent implements OnInit {

  @Output() private dayChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public day: boolean;
  @Input() public id: string;

  // public eri: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  change(newVal: any) {
    this.day = newVal;
    this.dayChange.emit(this.day);
  }

}
