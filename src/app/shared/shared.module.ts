import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material-module/material.module';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {AuthGuard} from './guards/auth-guard.service';
import {TokenInterceptor} from './http/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UnauthorizedInterceptor} from './http/response.interceptor';
import {PatientAuthGuard} from './guards/patient-auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ],
  declarations: [],
  providers: [
    AdminAuthGuard, AuthGuard, PatientAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }]
})
export class SharedModule {
}
