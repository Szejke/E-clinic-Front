import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getIdFromToken} from '../shared/helpers/token.helper';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getPatientData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/patients/${getIdFromToken()}`);
  }

  savePatientData(value: any) {
    value.pesel += '';
    console.log(value);
    return this.http.patch<any>(`${environment.apiUrl}/patients/${getIdFromToken()}`,
      value
      , {observe: 'response'})
  }
}
