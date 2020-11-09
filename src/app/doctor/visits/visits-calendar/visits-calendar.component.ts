import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatCalendar} from '@angular/material';

@Component({
  selector: 'app-visits-calendar',
  templateUrl: './visits-calendar.component.html',
  styleUrls: ['./visits-calendar.component.scss']
})
export class VisitsCalendarComponent implements OnInit {
  @ViewChild(MatCalendar) _datePicker: MatCalendar<Date>

  @Output()
  dateEmitter = new EventEmitter<Date>();

  constructor() {
  }

  ngOnInit() {
    this._datePicker.selectedChange.subscribe(date => {
      this.emitDate(date);
    });
  }

  emitDate($event: Date) {
    this.dateEmitter.emit($event);
  }
}
