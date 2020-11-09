import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewVisit} from '../shared/models/new-visit.model';
import {Observable} from 'rxjs';
import {Visit} from '../shared/models/visit.model';
import {getIdFromToken} from '../shared/helpers/token.helper';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class VisitsService {

  constructor(private http: HttpClient) {
  }

  getVisits(date: Date): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${environment.apiUrl}/doctor/${getIdFromToken()}/visits/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`);
  }

  tryAdd(newVisit: NewVisit): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/doctor/${getIdFromToken()}/visits`, newVisit);
  }

  updateVisit(visitId: string, receipt: string, diagnosis: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/doctor/${getIdFromToken()}/visits/${visitId}`, {
      receipt: receipt,
      diagnosis: diagnosis
    }, {observe: 'response'})
  }

  delete(visitId: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/doctor/${getIdFromToken()}/visits/${visitId}`, {observe: 'response'})
  }
}
