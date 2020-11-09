import {Visit} from './visit.model';

export interface Payment {
  id?: string;
  visit?: Visit;
  paid?: number;
}
