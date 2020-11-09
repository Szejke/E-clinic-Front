import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LoginRoutingModule} from './auth.routing';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthenticationService} from '../services/authentication.service';
import { RegisterComponent } from './register/register.component';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angular5-social-login';

export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('1014494443808-8mrkfeg281fuigs6gstdd68tce3qhlm9.apps.googleusercontent.com')
      },
    ]);
}
// qvvRFqGfFS7GZG04hPgGECOo secret

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SocialLoginModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [AuthenticationService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }]
})
export class AuthModule { }
