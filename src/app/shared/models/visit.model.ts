import {Doctor} from './doctor.model';
import {Payment} from './payment.model';
import {Patient} from './patient.model';

export interface Visit {
  id?: string;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minutes?: number;
  duration?: number;
  status?: string;
  time?: any;
  receipt?: string;
  diagnose?: string;
  doctor?: Doctor;
  price?: number;
  payment?: Payment;
  patient?: Patient;
}
