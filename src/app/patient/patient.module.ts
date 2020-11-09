import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../shared/material-module/material.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {PatientRoutingModule} from './patient.routing';
import {PatientDashboardComponent} from './patient-dashboard/patient-dashboard.component';
import {PatientVisitsService} from '../services/patient-visits.service';
import {ReservedVisitsComponent} from './reserved-visits/reserved-visits.component';
import {ReserveVisitComponent} from './reserve-visit/reserve-visit.component';
import {PatientDataComponent} from './patient-data/patient-data.component';
import {AbortVisitComponent} from './reserved-visits/abort-visit/abort-visit.component';
import {PostponeVisitComponent} from './reserved-visits/postpone-visit/postpone-visit.component';
import {PatientService} from '../services/patient.service';

@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AbortVisitComponent, PostponeVisitComponent],
  providers: [PatientVisitsService, PatientService],
  declarations: [
    PatientDashboardComponent,
    ReservedVisitsComponent,
    ReserveVisitComponent,
    PatientDataComponent,
    AbortVisitComponent,
    PostponeVisitComponent]
})
export class PatientModule {
}
