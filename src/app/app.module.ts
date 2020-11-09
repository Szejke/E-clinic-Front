import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {LayoutModule} from './layout/layout.module';
import {HomeModule} from './home/home.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from './shared/material-module/material.module';
import {DoctorModule} from './doctor/doctor.module';
import {PatientModule} from './patient/patient.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    RouterModule,
    LayoutModule,
    HomeModule,
    HttpClientModule,
    AuthModule,
    MaterialModule,
    DoctorModule,
    PatientModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    HomeModule,
    AppRoutingModule,
    AuthModule,
    MaterialModule,
    DoctorModule,
    PatientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
