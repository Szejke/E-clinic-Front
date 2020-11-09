import {JwtHelper} from 'angular2-jwt';
import {TOKEN_NAME} from '../../services/auth.constant';
import {DOCTOR_ROLE, PATIENT_ROLE} from '../../app.consts';

export function getIdFromToken() {
  const token = new JwtHelper().decodeToken(JSON.parse(localStorage.getItem(TOKEN_NAME)).access_token);
  console.log(token);
  return [DOCTOR_ROLE, PATIENT_ROLE].includes(token.authorities[0]) ? token.authorities[1] : token.authorities[0];
}

export function getRoleFromToken(token: any) {
  return [DOCTOR_ROLE, PATIENT_ROLE].includes(token.authorities[0]) ? token.authorities[0] : token.authorities[1];
}
