import {Injectable} from '@angular/core';
import {MenuItem} from '../shared/models/menu-item.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SideNavService {

  constructor(private http: HttpClient) {
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>('/assets/data/json/menu-items.json');
  }
}
