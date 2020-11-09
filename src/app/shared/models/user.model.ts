import {Visit} from './visit.model';

export interface User {
  id?: string;
  name?: string;
  surname?: string;
  visits?: Visit[];
}
