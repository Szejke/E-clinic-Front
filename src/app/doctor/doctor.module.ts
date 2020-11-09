import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisitsComponent} from './visits/visits.component';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../shared/material-module/material.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {DoctorRoutingModule} from './doctor.routing';
import {DetailsSnackBarComponent, VisitsListComponent} from './visits/visits-list/visits-list.component';
import {VisitsCalendarComponent} from './visits/visits-calendar/visits-calendar.component';
import {AddVisitComponent} from './visits/add-visit/add-visit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VisitsService} from '../services/visits.service';
import {VisitDetailsComponent} from './visits/visit-details/visit-details.component';

@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    SharedModule
  ],
  entryComponents: [AddVisitComponent, VisitDetailsComponent, DetailsSnackBarComponent],
  declarations: [VisitsComponent, VisitsListComponent, VisitsCalendarComponent, AddVisitComponent, VisitDetailsComponent, DetailsSnackBarComponent],
  providers: [VisitsService]
})
export class DoctorModule { }
