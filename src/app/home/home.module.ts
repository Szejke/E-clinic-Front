import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home.routing';
import {WelcomeComponent} from './welcome/welcome.component';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../shared/material-module/material.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserModule,
    MaterialModule,
    RouterModule,
    SharedModule
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent, WelcomeComponent],
  providers: []
})
export class HomeModule {
}
