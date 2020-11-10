import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  currentDay: Date = new Date();
  time: any;

  constructor() { }

  ngOnInit() {
  }

  chooseCurrentDay($event: Date) {
    this.currentDay = $event;
  }
}
