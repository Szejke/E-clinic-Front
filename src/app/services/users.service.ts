import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCTOR_ROLE, PATIENT_ROLE} from '../app.consts';
import {JwtHelper} from 'angular2-jwt';
import {TOKEN_NAME} from './auth.constant';
import {AuthService as SocialAuthService, GoogleLoginProvider, SocialUser} from 'angular5-social-login';
import {getRoleFromToken} from '../shared/helpers/token.helper';

@Injectable()
export class UsersService {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isDoctor: boolean;
  isPatient: boolean;
  user: any;

  constructor(private socialAuthService: SocialAuthService, private http: HttpClient) {
    const token = JSON.parse(localStorage.getItem(TOKEN_NAME));
    if (token != null) {
      this._initializeRoles(token);
    }
  }

  private _initializeRoles(token: any) {
    const decodedToken = this.jwtHelper.decodeToken(token.access_token);
    console.log(decodedToken);
    this.isDoctor = getRoleFromToken(decodedToken) === DOCTOR_ROLE;
    this.isPatient = getRoleFromToken(decodedToken) === PATIENT_ROLE;
    this.accessToken = token.access_token;
    this.user = decodedToken.user;
  }

  private _saveToken(token: string) {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(token));
  }

  login(token: string) {
    this._initializeRoles(token);

    this._saveToken(token);
  }

  logout() {
    this.accessToken = null;
    this.isDoctor = false;
    localStorage.removeItem(TOKEN_NAME);
  }

  isDoctorUser(): boolean {
    return this.isDoctor;
  }

  isPatientUser(): boolean {
    return this.accessToken && this.isPatient;
  }

  isLogged(): boolean {
    return this.accessToken && (this.isDoctor || this.isPatient);
  }

  gmailLogin(): Promise<SocialUser> {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    return this.socialAuthService.signIn(socialPlatformProvider);
  }
}
