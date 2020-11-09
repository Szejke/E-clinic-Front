import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Visit} from '../shared/models/visit.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {getIdFromToken} from '../shared/helpers/token.helper';

@Injectable()
export class PatientVisitsService {


  constructor(private http: HttpClient) {
  }

  getReservedVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${environment.apiUrl}/patient/${getIdFromToken()}/visits`);
  }

  abort(id: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/patient/${getIdFromToken()}/visits/${id}/reservation/abort`, null, {observe: 'response'});
  }

  postpone(visitId: string, newVisit: string) {
    return this.http.patch(`${environment.apiUrl}/patient/${getIdFromToken()}/visits/${visitId}/postpone/${newVisit}`, null, {observe: 'response'});
  }

  getVisitsForPostponeByDate(visitId: string, choosenDay: Date) {
    return this.http.get<Visit[]>(`${environment.apiUrl}/patient/${getIdFromToken()}/visits/${visitId}/postpone/${choosenDay.getFullYear()}/${choosenDay.getMonth()}/${choosenDay.getDate()}`);
  }

  getVisitsForPostpone(visitId: string) {
    return this.http.get<Visit[]>(`${environment.apiUrl}/patient/${getIdFromToken()}/visits/${visitId}/postpone`);
  }

  getFreeVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${environment.apiUrl}/patient/visits/allowed`);
  }

  reserve(id: any): Observable<any> {
    return this.http.post<Visit[]>(`${environment.apiUrl}/patient/${getIdFromToken()}/visits/${id}/reservation`, null,{observe: 'response'});
  }

  pay(visitId: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/patient/${getIdFromToken()}/visits/${visitId}/payment`, null, {observe: 'response'});
  }
}
