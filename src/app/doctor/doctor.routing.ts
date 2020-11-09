import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {VisitsComponent} from './visits/visits.component';
import {AdminAuthGuard} from '../shared/guards/admin-auth-guard.service';
import {AuthGuard} from '../shared/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'doctor/visits',
    component: VisitsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class DoctorRoutingModule {
}
