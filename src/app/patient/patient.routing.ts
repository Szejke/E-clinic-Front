import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PatientDashboardComponent} from './patient-dashboard/patient-dashboard.component';
import {AuthGuard} from '../shared/guards/auth-guard.service';
import {PatientAuthGuard} from '../shared/guards/patient-auth-guard.service';

const routes: Routes = [
  {
    path: 'patient/dashboard',
    component: PatientDashboardComponent,
    canActivate: [AuthGuard, PatientAuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}
