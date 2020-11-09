import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from '@angular/material';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {

  fetchReserved = true;

  @ViewChild(MatTabGroup)
  tabGroup: MatTabGroup;

  constructor() {
  }

  ngOnInit() {
  }

  changeTab() {
    this.tabGroup.selectedIndex = 0;
    this.fetchReserved = !this.fetchReserved;
  }
}
